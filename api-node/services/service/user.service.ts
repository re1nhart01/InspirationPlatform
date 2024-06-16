import {User, UserDeclaration} from "../../models/users";
import {sequelize} from "../db/sql/driver";
import {col, fn, Op, QueryTypes, where} from "sequelize";
import {IFullUserResult, IMessagesPagingResult} from "../../types/result";
import {Post} from "../../models/post";
import {UserSubscriptions} from "../../models/subscription";
import { defaultTo, isNil } from "ramda";
import {nonChangeableParams} from "../helpers/constants";
import {ISubscription} from "../../types/modeling";
import {hashString} from "../helpers/functions";
import {ChatData} from "../../models/chat";


type ICounter = { owner_count: number; subscriber_count: number };

export class UsersRepository {
    public static async getCounters(username: string): Promise<ICounter> {
        const [result] = await sequelize.query(`
            SELECT x.owner_count, y.subscriber_count FROM
		        (SELECT COUNT(*) AS owner_count from user_subscription WHERE maker = ?) AS x, 
		        (SELECT COUNT(*) AS subscriber_count FROM user_subscription WHERE subscriber = ?) as y
            `, {
            replacements: [ username, username ],
            type: QueryTypes.SELECT,
        })

        return {
            owner_count: defaultTo(0, (<ICounter>result).owner_count),
            subscriber_count: defaultTo(0, (<ICounter>result).subscriber_count),
        }
    }

    public static async getMe(username: string) {
        const result: { userData: UserDeclaration | null; counts: { owner_count: number; subscriber_count: number; } } = {
            userData: null,
            counts: {
                owner_count: 0,
                subscriber_count: 0,
            },
        }
        try {
            const userData = await User.findOne({ where: { username }, attributes: { exclude: ["password", "token"] } })
            if (userData) {
                result.userData = userData;
                const countOwner = await UsersRepository.getCounters(username);
                if (countOwner) {
                    result.counts = countOwner as unknown as { owner_count: number; subscriber_count: number; };
                }
            }
        } catch (e) {}
        return result;
    }

    public static async getFullUserData(userId: string, username: string) {
        const result: IFullUserResult = {
            isPrivate: false,
            userData: null,
            userPosts: [],
            isSubscribe: false,
            isSubscribed: null,
            counts: {
                owner_count: 0,
                subscriber_count: 0,
            }
        }
        try {
            result.userData = await User.findOne({ where: { username: userId }, attributes: { exclude: [ "password", "token" ] } });
            result.counts = await UsersRepository.getCounters(userId);
            const subscription = await UserSubscriptions.findOne({ where: { maker: userId, subscriber: username } })
            if (result.userData) {
                const conditionToShowPosts = !result.userData.is_private || (result.userData.is_private && subscription?.status! > 2);
                if (conditionToShowPosts) {
                    result.userPosts = await Post.findAll({ where: { owner: userId } })
                }
                result.isPrivate = !conditionToShowPosts;
                result.isSubscribe = !!subscription;
            }
            result.isSubscribed = subscription;
            return result;
        } catch (e) {
            throw result;
        }
    }

    public static async resetUserParam(param: string, value: string, username: string) {
        try {
            if (nonChangeableParams.includes(param)) {
                throw "ERROR! ON dbSetParamResponse. You can't change this param";
            }
            await User.update({ [param]: value }, {
                where: { username }
            })
            return true;
        } catch (e) {
            throw e;
        }
    }

    public static async getUsersInSearch(query: string) {
        try {
            const firstIteration = await User.findAll(
        { attributes:  ["username", "full_name", "description"],
                subQuery: false,
                where:  where(fn('LOWER', col('username')), {
                     [Op.like]: `%${query.toLowerCase()}%`
                 })
                })
            return defaultTo([], firstIteration);
        } catch (e) {
            return [];
        }
    }

    public static async removeUserToken(username: string) {
        try {
            await User.update({ token: "" }, { where: { username } })
            return "";
        } catch (e: any) {
            throw e?.toString()
        }
    }

    public static async handleUserSubscription(owner: string, subscriber: string) {
        try {
            const subscription: ISubscription = {
                maker: owner,
                subscriber: subscriber,
                created_at: new Date(),
                updated_at: new Date(),
            }
            const ownerUser = await User.findOne({ where: { username: owner } });
            const subscriptionCounts = await UserSubscriptions.count({ where: { maker: owner, subscriber } });
            if (subscriptionCounts !== 0 || owner === subscriber) {
                return false;
            }

            const actualSubscription = await UserSubscriptions.findOne({ where: { maker: subscriber, subscriber: owner, status: { [Op.gt]: 1 } } })
            if (isNil(actualSubscription)) {
                subscription.status = ownerUser?.is_private ? 1 : 2;
            } else {
                const chat_hash = hashString([owner, subscriber, Date.now()].join("@"))
                subscription.status = 3;
                subscription.socket_hash = chat_hash;
                await UserSubscriptions.update({ socket_hash: chat_hash, status: 3 }, { where: { maker: subscriber, subscriber: owner, status: { [Op.gt]: 1 } } })
            }
            await UserSubscriptions.create(subscription);

            return true;
        } catch (e) {
            console.log(e);
            throw false;
        }
    }

    public static async removeSubscription(maker: string, subscriber: string) {
        try {
            await UserSubscriptions.destroy({ where: { maker, subscriber } })
            return true;
        } catch (e) {
            throw false;
        }
    }

    public static async acceptRequestOnSubscription(owner: string, username: string, accepted: boolean) {
        try {
            if (accepted) {
                await UserSubscriptions.update({ status: 2 }, { where: { maker: owner, subscriber: username } });
            } else {
                await UserSubscriptions.destroy({ where: { maker: owner, subscriber: username } });
            }
            return true;
        } catch (e) {
            throw false;
        }
    }

    public static async getRequestList(username: string) {
        try {
            const [result] = await sequelize.query(`
		SELECT * FROM user_subscription
		INNER JOIN (SELECT full_name, username, email, description FROM users)
		AS user_rows ON user_subscription.subscriber = user_rows.username
		AND user_subscription.maker = ? AND user_subscription.status = 1`, {replacements: [ username ]})
            return result;
        } catch (e) {
            return [];
        }
    }

    public static async getSubscriptionList(type1: "maker" | "subscriber", type2: "maker" | "subscriber", subscriber: string) {
        try {
            const [result] = await sequelize.query(`
		SELECT * FROM user_subscription
		INNER JOIN (SELECT full_name, username, email, description FROM users)
		AS user_rows ON user_subscription.${type2} = user_rows.username
		AND user_subscription.${type1} = ?`, { replacements: [subscriber] })
            return result;
        } catch (e) {
            return [];
        }
    }

    public static async createPost(username: string, counterFiles: number, caption: string, type: number, postHash: string) {
        try {
            const post = await Post.create({
                owner: username,
                like_id: username,
                type,
                caption,
                date_of_creation: new Date(),
                data_count: counterFiles,
                image: postHash,
                text: postHash,
            })
            return post;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static async getMessages(owner: string, to: string, page: number, init: boolean) {
        const limit = 30
        const result: IMessagesPagingResult = {
            totalPages: 0,
            isInit: false,
            items: [],
            pageIndex: 0,
            pageSize: limit,
        };
        try {
            const allMessagesCount = await ChatData.count({ where: {
                [Op.or]: [
                    {
                        sender: owner,
                        companion: to
                    },
                    {
                        sender: to,
                        companion: owner
                    }
                ]
                } })
            const totalPages = Math.ceil(allMessagesCount / limit);
            const list = await ChatData.findAll({ where: {
                    [Op.or]: [
                        {
                            sender: owner,
                            companion: to
                        },
                        {
                            sender: to,
                            companion: owner
                        }
                    ]
                },
                limit,
                offset: limit * page,
            })
            result.totalPages = totalPages;
            result.isInit = init;
            result.items = list;
            result.pageIndex = page;
            result.pageSize = limit
            return result;
        } catch (e) {
            throw result;
        }
    }

}
