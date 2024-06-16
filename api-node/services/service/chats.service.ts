import {ChatData} from "../../models/chat";


export class ChatsRepository {

    public static async addMessage(owner: string, { companion, message_hash, plain_message }: { companion: string; message_hash: string; plain_message: string }) {
        try {
            console.log({
                status: 2,
                sender: owner,
                companion,
                message_hash,
                created_at: Date.now(),
                plain_message,
                type: 0,
            })
            return await ChatData.create({
                status: 2,
                sender: owner,
                companion,
                message_hash,
                created_at: Date.now(),
                plain_message,
                type: 0,
            });
        } catch (e) {
            console.log(e);
            throw null;
        }
    }

    public static async updateMessageStatus(sender: string, companion: string, status: number) {
        try {
            await ChatData.update({ status }, { where: { sender, companion } })
            return 200;
        } catch (e) {
            return 403;
        }
    }

}
