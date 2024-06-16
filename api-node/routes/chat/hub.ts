import WebSocket from "ws";
import {ISocketClient} from "./type";
import {defaultTo} from "ramda";




export class Hub {
    private _storage: Map<string, ISocketClient[]>;

    constructor() {
        this._storage = new Map<string, ISocketClient[]>;
    }


    public addUser(chatHash: string, client: ISocketClient) {
        const room = this._storage.get(chatHash);
        const newList = [...defaultTo([], room), client];
        this.storage.set(chatHash, newList)
    }

    public removeUser(chatHash: string, clientUUID: string) {
        const room = this._storage.get(chatHash);
        if (!room) {
            return;
        }
        if (room!?.length <= 1) {
            const currentClient = room?.find((el) => el.uuid === clientUUID)
            if (currentClient) {
                currentClient.connector.close(1002);
            }
            this._storage.delete(chatHash);
        } else {
            this._storage.set(chatHash, room?.filter((el) => el.uuid !== clientUUID))
        }
    }

    public get storage(): Map<string, ISocketClient[]> {
        return this._storage;
    }

}
