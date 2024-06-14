import {sequelize} from "../services/db/sql/driver";

export const TABLES = {
	USERS:          "users",
	POSTS:          "posts",
	SUBSCRIPTIONS:  "user_subscription",
	USERToUSERChat: "chat_u2u",
	LIKES:          "likes",
	NOTIFICATIONS:  "notifications",
	COMMENTS:       "comments",
}



export async function executeSyncModels() {
	await sequelize.sync({ logging: true })
}
