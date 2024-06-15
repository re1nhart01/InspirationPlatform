import {Post, PostDeclaration} from "../../models/post";
import {sequelize} from "../db/sql/driver";


export class PostRepository {

    public static async getMyPosts(username: string) {
        try {
            const posts = await Post.findAll({ where: { owner: username } });
            return posts
        } catch (e) {
            return [];
        }
    }

    public static async addPost() {

    }

    public static async getNewsLine(username: string, page: number) {
        const result: { list: PostDeclaration[]; pageCount: number } = {
            list: [],
            pageCount: 0,
        }
        try {
            const postBunch: number = 30
            result.list = await Post.findAll({ offset: postBunch * page, limit: postBunch })
            const fullList = await Post.count()
            result.pageCount = Math.ceil(fullList / postBunch);
            return result;
        } catch (e) {
            throw result
        }
    }

    public static async getMyNewsLine(username: string, page: number) {
        try {
            const [result] = await sequelize.query(`
                    SELECT * FROM posts INNER JOIN
                    (SELECT maker, subscriber, status FROM user_subscription 
                    WHERE STATUS > 1 AND subscriber = ?)
                    AS subs ON (posts.owner = subs.maker)
                     ORDER BY posts.date_of_creation DESC
		`,
{
            replacements: [username, username],

        })
            return result;
        } catch (e) {
            return [];
        }
    }

    public static async getPostWithLikes(postHash: string, username: string) {
        try {
            const [result] = await sequelize.query(`
                SELECT * FROM (SELECT * FROM posts WHERE posts.image = ?) as posts2
                LEFT JOIN (SELECT maker, subscriber, status FROM user_subscription 
                WHERE subscriber = ?)
                AS subs ON (posts2.owner = subs.maker)`, {
                replacements: [postHash, username]
            })
            return result[0];
        } catch (e) {
            throw {};
        }
    }

}
