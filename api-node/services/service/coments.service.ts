import {hashString} from "../helpers/functions";
import {Comment} from "../../models/comment";
import {User} from "../../models/users";
import {sequelize} from "../db/sql/driver";


export class CommentsRepository {
    public static async addComment(username: string, comment_string: string, post_hash: string) {
        try {
            if (comment_string.length < 5) {
                throw "Comment Length can not be less than 5 characters!"
            }
            const comment_hash = hashString([username, post_hash, "NOW", Date.now()].join(""))
            const newComment = await Comment.create({
                comment_hash,
                creator: username,
                comment_string,
                post_hash,
            })
            return newComment;
        } catch (e: any) {
            throw e?.toString()
        }
    }

    public static async removeComment(comment_hash: string, post_hash: string, creator: string) {
        try {
            await Comment.destroy({ where: { comment_hash, post_hash, creator } })
            return ""
        } catch (e: any) {
            throw e?.toString();
        }
    }

    public static async bulkGetComments(post_hash: string) {
        try {
            const [result] = await sequelize.query(`
                select * from (select * from comments where post_hash = ?) as co
	            left join (select username, location, full_name from users) as us on co.creator = us.username 
                GROUP BY id`, { replacements: [post_hash] })
            return result;
        } catch (e) {
            return [];
        }
    }

    public static async updateComment(username: string, comment_hash: string, comment_string: string, post_hash: string) {
        try {
            await Comment.update(
                    { comment_string },
                    {
                        where: {
                            post_hash,
                            comment_hash,
                            creator: username
                        }
                    })
            return "";
        } catch (e: any) {
            throw e?.toString();
        }
    }
}
