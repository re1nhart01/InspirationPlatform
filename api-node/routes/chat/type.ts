import WebSocket from "ws";
import {Hub} from "./hub";


export interface ISocketClient {
    username: string;
    connector: WebSocket;
    hub: Hub;
    uuid: string;
    chatHash: string
}


export enum Events {
    SendMessage = "SendMessage",
    Connect = "Connect",
    ReadAllMessages = "ReadAllMessages",
    RemoveOneMessage = "RemoveOneMessage",
    RemoveBunchMessages = "RemoveBunchMessages",
    AddedMessage = "AddedMessage",
}

export interface EventMessage {
    event: typeof Events;
    data: any;
}
