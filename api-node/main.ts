import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./services/db/sql/driver";
import { print } from "./services/helpers/functions"
import authRouter from "./routes/auth";
import commentsRouter from "./routes/comments";
import likesRouter from "./routes/likes";
import notificationsRouter from "./routes/notifications";
import postsRouter from "./routes/posts";
import searchRouter from "./routes/search";
import settingsRouter from "./routes/settings";
import usersRouter from "./routes/users";
import * as path from "path";
import {ChatWSRouter} from "./routes/chat/chat";

dotenv.config({
    path: "./services/env/.env"
});

sequelize.sync({ logging: true }).then((v) => {
    console.log(v.getDatabaseName(), "IS SUCCESSFULLY RUNNED!")
})

const corsOption = {
    origin: ['http://localhost:3000'],
};

const PORT = process.env.PORT;
const app = express();

app.use(cors(corsOption));
app.use("/storage", express.static(path.join(__dirname, 'storage')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter)
app.use("/comments", commentsRouter)
app.use("/likes", likesRouter)
app.use("/notifications", notificationsRouter)
app.use("/posts", postsRouter)
app.use("/search", searchRouter)
app.use("/settings", settingsRouter)
app.use("/users", usersRouter)

const chatApi = new ChatWSRouter().init();
app.use("/messaging", chatApi.httpRouter)

app.get("/", (req, res) => {
    res.send({
        "isAlive": true,
    })
})

app._router.stack.forEach(print.bind(null, []))


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})
