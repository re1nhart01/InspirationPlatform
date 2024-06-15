import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {StatusCodes} from "http-status-codes";
import Requestor from "../services/helpers/response";
import {LikeRepository} from "../services/service/likes.service";

const router = express.Router()


router.get('/:postowner/:posthash/like', authMiddleware, async (req, res) => {
    try {
      const pHash = req.params.posthash;
      const pOwner = req.params.postowner;
      const { username } = (<AuthRequest><unknown>req).user;
      const isLike = await LikeRepository.handleLikes(username, pHash, pOwner)
      res.status(200).send(Requestor.GiveOKResponseWithData({
          post_hash: pHash,
          is_like: isLike,
      }))
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
});


router.get('/getLikes/:posthash', authMiddleware, async (req, res) => {
  try {
    const pHash = req.params.posthash;
    const { username } = (<AuthRequest><unknown>req).user;
    const likeData = await LikeRepository.getLikesByHash(pHash, username);
    res.status(200).send(Requestor.GiveOKResponseWithData(likeData))
  } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
  }
});

export default router;
