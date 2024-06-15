import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {PostRepository} from "../services/service/post.service";
import {isNil} from "ramda";
import Requestor from "./../services/helpers/response";
import {StatusCodes} from "http-status-codes";
import {castParamWithExtendedValue} from "../services/helpers/functions";

const router = express.Router()


router.post('/add', function(req, res) {
  res.send('Birds home page');
});


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const { username } = (<AuthRequest>req).user;
        const myPosts = await PostRepository.getMyPosts(username);
        res.status(200).send({
            data: myPosts,
        })
    } catch (e) {
        res.status(423).send({
            message: "Bad Token!",
        })
    }
});

router.post('/delete', function(req, res) {
    res.send('About birds');
});

router.get('/getNewsline', authMiddleware, async (req, res) => {
    const page = !isNil(req.query.page) ? +req.query.page : 0;
    const { username } = (<AuthRequest>req).user;
    try {
        const { pageCount, list } = await PostRepository.getNewsLine(username, page);
        res.status(200).send({
            ...Requestor.GiveOKResponseWithData(list),
            pages: pageCount
        })
    } catch (e) {
        res
            .status(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE)
            .send(Requestor.GiveResponse(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE,
                "Range Not Satisfiable"))
    }
});

router.get('/getMyNewsLine', authMiddleware, async (req, res) => {
    const { username } = (<AuthRequest>req).user;
    try {
        const list = await PostRepository.getMyNewsLine(username, 0);
        res.status(200).send({
            ...Requestor.GiveOKResponseWithData(list),
            pages: 0
        })
    } catch (e) {
        res
            .status(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE)
            .send(Requestor.GiveResponse(StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE,
                "Range Not Satisfiable"))
    }
});

router.get('/getPost/:post_hash', authMiddleware, async (req, res) => {
    const { username } = (<AuthRequest><unknown>req).user;
   try {
       const postHash = castParamWithExtendedValue(req.params, "post_hash");
       console.log(postHash);
       const postData = await PostRepository.getPostWithLikes(postHash, username);
       res.status(200).send(Requestor.GiveOKResponseWithData(postData));
   } catch (e) {
       res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
   }
});


export default router;
