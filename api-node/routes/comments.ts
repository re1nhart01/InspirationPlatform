import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {StatusCodes} from "http-status-codes";
import Requestor from "../services/helpers/response";
import {CommentsRepository} from "../services/service/coments.service";

const router = express.Router()


router.post('/:posthash/add', authMiddleware, async (req, res) => {
  try {
    const { username } = (<AuthRequest><unknown>req).user;
    const postHash = req.params.posthash;
    const requestBody = req.body;
    const resData = await CommentsRepository.addComment(username, requestBody.comment, postHash)
    res.status(200).send(Requestor.GiveOKResponseWithData(resData))
  } catch (e) {
    res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
  }
});


router.delete('/:posthash/:commenthash/delete', authMiddleware, async (req, res) => {
    try {
      const { username } = (<AuthRequest><unknown>req).user;
      const postHash = req.params.posthash;
      const commentHash = req.params.commenthash;
      await CommentsRepository.removeComment(commentHash, postHash, username);
      res.status(200).send(Requestor.GiveOKResponse());
    } catch (e) {
      res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
    }
});

router.get('/:posthash/get', authMiddleware, async (req, res) => {
  try {
    const { username } = (<AuthRequest><unknown>req).user;
    const postHash = req.params.posthash;
    const comments = await CommentsRepository.bulkGetComments(postHash);
    res.status(200).send(Requestor.GiveOKResponseWithData(comments));
  } catch (e) {
    console.log(e);
    res.status(403).send(Requestor.GiveOKResponseWithData([]));
  }
  });

  router.put('/:posthash/:commenthash/update', authMiddleware, async (req, res) => {
    try {
      const { username } = (<AuthRequest><unknown>req).user;
      const postHash = req.params.posthash;
      const commentHash = req.params.commenthash;
      const comment = req.body.comment;
      await CommentsRepository.updateComment(username, commentHash, postHash, comment)
      res.status(200).send(Requestor.GiveOKResponse());
    } catch (e) {
      res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
    }
  });

export default router;
