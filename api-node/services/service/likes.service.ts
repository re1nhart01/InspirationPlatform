import {Like} from "../../models/like";
import {ILikeBodyResult} from "../../types/result";
import {isNil} from "ramda";


export class LikeRepository {

    public static async handleLikes(initiator: string, postHash: string, creator: string) {
        try {
            const likeBody = await Like.findOne({ where: { post_hash: postHash, creator, initiator } })
            if (likeBody) {
                await Like.destroy({ where: { post_hash: postHash, creator, initiator } })
                return false;
            } else {
                await Like.create({
                    post_hash: postHash,
                    creator,
                    initiator,
                    created_at: new Date(),
                })
                return true;
            }
        } catch (e) {
            return false
        }
    }


    public static async getLikesByHash(post_hash: string, initiator: string) {
        const result: ILikeBodyResult = {
            isLiked: false,
            likesCount: 0,
        }
        try {
            result.isLiked = !isNil(await Like.findOne({ where: { post_hash, initiator } }));
            result.likesCount = await Like.count({ where: { post_hash } })
            return result
        } catch (e) {
            return result
        }
    }

}
