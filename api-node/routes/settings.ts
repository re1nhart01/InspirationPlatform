import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {isNil} from "ramda";
import {StatusCodes} from "http-status-codes";
import Requestor from "../services/helpers/response";
import {UsersRepository} from "../services/service/user.service";

const router = express.Router()


router.post('/avatar', function(req, res) {
  res.send('Birds home page');
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
