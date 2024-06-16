import express from "express";
import {authMiddleware, AuthRequest} from "../../middleware/auth.middleware";
import {StatusCodes} from "http-status-codes";
import Requestor from "../../services/helpers/response";
import {defaultTo} from "ramda";
import {UsersRepository} from "../../services/service/user.service";
import Websocket from "ws";
import {parseUrlFromSocket} from "../../services/helpers/functions";
import {parseToken} from "../../services/jwt";
import { Hub } from "./hub";
import {Events, ISocketClient} from "./type";
import {ChatsRepository} from "../../services/service/chats.service";


const router = express.Router()
const wss = new Websocket.Server({ port: 8081 })

export class ChatWSRouter {
    public hub: Hub;
    public get httpRouter() {
        return router;
    }

    constructor() {
        this.hub = new Hub();
    }

    public get wsRouter() {
        return wss;
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
        try {
            wss.on("connection", (ws, req) => {
                const { chatHash, token } = parseUrlFromSocket(defaultTo("", req.url));
                const userData: { username: string; email: string } | null = parseToken(token);
                if (!userData?.username) {
                    ws.close();
                    return;
                }
                const client: ISocketClient = {
                    uuid: crypto.randomUUID(),
                    chatHash: chatHash,
                    hub: this.hub,
                    username: userData.username,
                    connector: ws,
                }
                this.hub.addUser(chatHash, client);
                console.log(this.hub.storage);
                ws.on("message", (m) => this.emitter(m, client));
                ws.on("close", (e) => {
                    console.log("CLOSED!", e);
                    this.hub.removeUser(chatHash, client.uuid)
                })
            });
        } catch (e) {
            wss.close((err) => {
                console.log(err);
            })
        }
    }


    public async emitter(message: Websocket.RawData, currentClient: ISocketClient) {
        try {
            const parsedMessage = JSON.parse(String(message));
            const event: Events = parsedMessage.event;
            const data: any = parsedMessage.data;
            switch (event) {
                case Events.Connect:
                    console.log("Connected!");
                    break;
                case Events.SendMessage:
                    const newMessage = await ChatsRepository.addMessage(currentClient.username, data);
                    const room = currentClient.hub.storage.get(currentClient.chatHash);
                    if (room) {
                        for (let i = 0; i < room.length; i++) {
                            if (room[i].uuid === currentClient.uuid) {
                                const messageForMe = {
                                    "event":      Events.AddedMessage,
                                    "statusCode": StatusCodes.OK,
                                    "username":   currentClient.username,
                                    "message":    newMessage,
                                }
                                currentClient.connector.send(JSON.stringify(messageForMe))
                            } else {
                                const messageForOther = {
                                    event: Events.SendMessage,
                                    data: newMessage
                                }
                                room[i].connector.send(JSON.stringify(messageForOther))
                            }
                        }
                    }
                    break;
                case Events.ReadAllMessages:
                    const roomRead = currentClient.hub.storage.get(currentClient.chatHash);
                    if (roomRead) {
                        for (let i = 0; i < roomRead.length; i++) {
                            if (roomRead[i].uuid === currentClient.uuid) {
                                const statusCode = await ChatsRepository.updateMessageStatus(data, currentClient.username, 3);
                                const bodyMine = {
                                    "statusCode":    statusCode,
                                    "statusMessage": "",
                                    "type":          1,
                                }
                                currentClient.connector.send(JSON.stringify({ event: Events.ReadAllMessages, data: bodyMine }))
                            } else {
                                const bodyOther = {
                                    "statusCode":    200,
                                    "type":          0,
                                    "statusMessage": null,
                                }
                                roomRead[i].connector.send(JSON.stringify({ event: Events.ReadAllMessages, data: bodyOther }))
                            }
                        }
                    }
                    break;
                case Events.RemoveOneMessage:
                    break;
                case Events.RemoveBunchMessages:
                default:
                    console.log(event);
                    break;
            }
        } catch (e) {
            console.log(e);
            this.hub.removeUser(currentClient.chatHash, currentClient.uuid);
        }
    }

    public init() {
        this.setHttpRoutes();
        this.setWSRoute();
        return this;
    }
}
