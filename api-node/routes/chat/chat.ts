import express from "express";
import {authMiddleware, AuthRequest} from "../../middleware/auth.middleware";
import {StatusCodes} from "http-status-codes";
import Requestor from "../../services/helpers/response";
import {defaultTo} from "ramda";
import {UsersRepository} from "../../services/service/user.service";
import Websocket from "ws";

const router = express.Router()
const ws = new Websocket.Server({ port: 8080 })

export class ChatWSRouter {
    public get httpRouter() {
        return router;
    }

    public get wsRouter() {
        return ws;
    }

    public setHttpRoutes() {
        router.get("/get-messages/:userName", authMiddleware, async (req,res) => {
            try {
                const { username } = (<AuthRequest><unknown>req).user;
                const page = +defaultTo(0, req.query.page);
                const init = JSON.parse(defaultTo("true", req.query.init as string))
                const companion = req.params.userName;
                const pagingResult = await UsersRepository.getMessages(username, companion, page, init);
                res.status(200).send(Requestor.GiveOKResponseWithData(pagingResult));
            } catch (e) {
                res.status(StatusCodes.BAD_REQUEST).send(Requestor.GiveResponse(StatusCodes.BAD_REQUEST, "BAD REQUEST"))
            }
        })
    }

    public setWSRoute() {

    }

    public init() {

        return this;
    }
}
