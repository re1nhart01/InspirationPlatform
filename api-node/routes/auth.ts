import express from "express";
import {ILoginUserBody, IRegisterUserBody} from "../types";
import Requestor from "./../services/helpers/response";
import {StatusCodes} from "http-status-codes";
import {AuthRepository} from "../services/service/auth";
import * as fs from "fs/promises";
import * as path from "path";

const router = express.Router()


router.post('/register', async (req, res) => {
  const requestBody = <IRegisterUserBody>req.body;
  try {
    const username = await AuthRepository.registerUser(requestBody);
    const serviceAvatarFile = await fs.readFile(path.join(__dirname, "..", "storage", "service", "base_avatar.png"));

    const pathToAvatar = path.join(__dirname, "..", "storage", username, "avatar");
    await fs.mkdir(pathToAvatar, { recursive: true });
    await fs.writeFile(path.join(pathToAvatar, "avatar.png"), serviceAvatarFile);
    res.status(200).send(Requestor.GiveOKResponseWithData(username))
  } catch (e: any) {
    res.status(200).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, e.toString()))
  }
});


router.post('/login', async (req, res) => {
  const requestBody = <ILoginUserBody>req.body;
  try {
    const userToken = await AuthRepository.loginUser(requestBody);
    res.status(200).send(Requestor.GiveOKResponseWithData(userToken))
  } catch (e: any) {
    res.status(208).send(Requestor.GiveResponse(208, e.toString()));
  }
});


export default router;
