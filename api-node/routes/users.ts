import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {UsersRepository} from "../services/service/user";
import Requestor from "./../services/helpers/response";

const router = express.Router()


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const { username, email } = (<AuthRequest>req).user;
            ///"http://" + c.Request.Host + "/storage/" + name + "/avatar/avatar.png"
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


router.get('/check', function(req, res) {
  res.send('About birds');
});

router.get('/logout', function (req, res) {
  res.send('About birds');
})

router.get('/:userId', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/subscribe', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/unfollow', function (req, res) {
    res.send('About birds');
})

router.post('/:userId/acceptRequest', function (req, res) {
    res.send('About birds');
})

router.post('/requestList', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/following', function (req, res) {
    res.send('About birds');
})

router.get('/:userId/followers', function (req, res) {
    res.send('About birds');
})


export default router;
