import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.middleware";
import {PostRepository} from "../services/service/post.service";
import {defaultTo, isNil} from "ramda";
import Requestor from "./../services/helpers/response";
import {StatusCodes} from "http-status-codes";
import {castParamWithExtendedValue, genRand, hashString} from "../services/helpers/functions";
import {uploadFileMiddleware} from "../middleware/file.middleware";
import {FileRepository} from "../services/service/file.service";
import {UsersRepository} from "../services/service/user.service";

const router = express.Router()

router.post('/add', authMiddleware, uploadFileMiddleware.array("image", 10), async (req, res) => {
    try {
        let files = req.files;
        const fileList = files && !Array.isArray(files) ? defaultTo([], files["image"]) : files;
        const { username } = (<AuthRequest>req).user;
        const salt = [username, new Date().toString(), genRand(32)].join("@")
        const postHash = hashString(salt)
        const countOfFiles = defaultTo(0, files?.length as number);
        const isCreatedInFolder = await FileRepository.addFilesForPost(username, postHash, fileList!);
        const newPost = await UsersRepository.createPost(username, countOfFiles, req.body.caption, +req.body.type, postHash)
        res.status(200).send({
            isGood: isCreatedInFolder ? "Good" : "Bad",
            data: newPost,
        })
    } catch (e) {
        res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
    }
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

router.post('/delete', authMiddleware, async (req, res) => {
    try {
        const { username } = (<AuthRequest>req).user;
        const postHash = req.body.hash;
        await PostRepository.removePost(postHash, username);
        await FileRepository.removePostFolder(username, postHash);
        res.status(200).send(Requestor.GiveOKResponse());
    } catch (e) {
        res.status(StatusCodes.FORBIDDEN).send(Requestor.GiveResponse(StatusCodes.FORBIDDEN, "FORBIDDEN"))
    }
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
