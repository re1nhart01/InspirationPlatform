import {User, UserDeclaration} from "../../models/users";
import {sequelize} from "../db/sql/driver";
import {col, fn, Op, QueryTypes, where} from "sequelize";
import {IFullUserResult} from "../../types/result";
import {Post} from "../../models/post";
import {UserSubscriptions} from "../../models/subscription";
import {defaultTo, isNotNil, not} from "ramda";
import {nonChangeableParams} from "../helpers/constants";


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
            isSubscribed: false,
            counts: {
                owner_count: 0,
                subscriber_count: 0,
            }
        }
        try {
            result.userData = await User.findOne({ where: { username }, attributes: { exclude: [ "password", "token" ] } });
            result.counts = await UsersRepository.getCounters(userId);
            if (result.userData) {
                const subscription = await UserSubscriptions.findOne({ where: { maker: userId, subscriber: username } })
                const conditionToShowPosts = (result.userData.is_private && subscription?.status! > 2) || !result.userData.is_private;
                if (conditionToShowPosts) {
                    result.userPosts = await Post.findAll({ where: { owner: userId } })
                }
                result.isPrivate = !conditionToShowPosts;
                result.isSubscribed = isNotNil(subscription);
            }
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

}
