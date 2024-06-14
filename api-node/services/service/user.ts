import {User, UserDeclaration} from "../../models/users";
import {sequelize} from "../db/sql/driver";
import {QueryTypes} from "sequelize";


export class UsersRepository {

    public static async getMe(username: string) {
        const result: { userData: UserDeclaration | null; counts: { owner_count: number; subscriber_count: number; } } = {
            userData: null,
            counts: {
                owner_count: 0,
                subscriber_count: 0,
            },
        }
        try {
            const userData = await User.findOne({ where: { username } })
            if (userData) {
                result.userData = userData;
                const countOwner = await sequelize.query(`
            SELECT x.owner_count, y.subscriber_count FROM
		        (SELECT COUNT(*) AS owner_count from user_subscription WHERE maker = ?) AS x, 
		        (SELECT COUNT(*) AS subscriber_count FROM user_subscription WHERE subscriber = ?) as y
            `, {
                    replacements: [ username, username ],
                    type: QueryTypes.SELECT,
                })
                if (countOwner[0]) {
                    result.counts = countOwner as unknown as { owner_count: number; subscriber_count: number; };
                }
            }
        } catch (e) {}
        return result;
    }
}
