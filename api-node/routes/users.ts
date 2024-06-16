import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {UsersRepository} from "../services/service/user.service";
import Requestor from "./../services/helpers/response";
import {StatusCodes} from "http-status-codes";
import {UserSubscriptions} from "../models/subscription";

const router = express.Router()


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const { username, email } = (<AuthRequest>req).user;
        const resultMe = await UsersRepository.getMe(username);
        res.status(200).send({
            me: true,
            data: resultMe,
            avatar: "http://" + req.hostname + "/storage/" + username + "/avatar/avatar.png",
        })
    } catch (e) {
        res.status(423).send({
            message: "Bad Token!",
        })
    }
});


router.get('/check', authMiddleware, async (req, res) => {
    try {

    } catch (e) {

    }
})

router.get('/logout', authMiddleware, async (req, res) => {
    try {
        const { username } = (<AuthRequest><unknown>req).user;
        await UsersRepository.removeUserToken(username);
        res.status(200).send(Requestor.GiveOKResponse());
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username } = (<AuthRequest><unknown>req).user;
        const fullUserData = await UsersRepository.getFullUserData(userId, username);
        res.status(200).send(Requestor.GiveOKResponseWithData(fullUserData));
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.get('/:userId/subscribe', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username } = (<AuthRequest><unknown>req).user;
        const isCreated = await UsersRepository.handleUserSubscription(userId, username);
        res.status(200).send(Requestor.GiveOKResponseWithData({
            "owner":      userId,
            "subscriber": username,
            isCreated,
        }))
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.get('/:userId/unfollow', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username } = (<AuthRequest><unknown>req).user;
        const result = await UsersRepository.removeSubscription(userId, username);
        res.status(200).send(Requestor.GiveOKResponseWithData({
            "owner":      userId,
            "subscriber": username,
            result,
        }))
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.post('/:userId/acceptRequest', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username } = (<AuthRequest><unknown>req).user;
        const isAccepted = req.body.status;
        const result = await UsersRepository.acceptRequestOnSubscription(username, userId, isAccepted);
        res.status(200).send(Requestor.GiveOKResponseWithData({
            "owner":      userId,
            "subscriber": username,
            result,
        }))
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.post('/requestList', authMiddleware, async (req, res) => {
    try {
        const { username } = (<AuthRequest><unknown>req).user;
        const responseList = await UsersRepository.getRequestList(username);
        res.status(200).send(Requestor.GiveOKResponseWithData(responseList));
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.get('/:userId/following', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const list = await UsersRepository.getSubscriptionList("subscriber", "maker", userId);
        res.status(200).send(Requestor.GiveOKResponseWithData(list))
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})

router.get('/:userId/followers', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const list = await UsersRepository.getSubscriptionList("maker", "subscriber", userId);
        res.status(200).send(Requestor.GiveOKResponseWithData(list))
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
    }
})


export default router;
