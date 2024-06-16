import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {isNil} from "ramda";
import {StatusCodes} from "http-status-codes";
import Requestor from "../services/helpers/response";
import {UsersRepository} from "../services/service/user.service";
import {uploadFileMiddleware} from "../middleware/file.middleware";
import {FileRepository} from "../services/service/file.service";

const router = express.Router()


router.post('/avatar', authMiddleware, uploadFileMiddleware.single("image"), async (req, res) => {
    try {
      const { username } = (<AuthRequest>req).user;
      const image = req.file;
      if (!image) {
        throw 300;
      }
      console.log(image);
      await FileRepository.removeAvatar(username);
      await FileRepository.uploadAvatar(username, image);
      res.status(200).send(Requestor.GiveOKResponse());
    } catch (e: any) {
      console.log(e);
      res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, e?.toString()))
    }
});


router.post('/:parameter', authMiddleware, async (req, res) => {
  const parameter = req.params.parameter;
  const { username } = (<AuthRequest><unknown>req).user;
  try {
    const body = req.body;
    if (isNil(body.parameter)) throw 300;
    await UsersRepository.resetUserParam(parameter, body.parameter, username)
    res.status(200).send(Requestor.GiveOKResponse())
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, e.toString()))
  }
});

export default router;
