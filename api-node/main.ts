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

dotenv.config({
    path: "./services/env/.env"
});

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use("/auth", authRouter)
app.use("/comments", commentsRouter)
app.use("/likes", likesRouter)
app.use("/notifications", notificationsRouter)
app.use("/posts", postsRouter)
app.use("/search", searchRouter)
app.use("/settings", settingsRouter)
app.use("/users", usersRouter)


app.get("/", (req, res) => {
    res.send({
        "isAlive": true,
    })
})
  
  app._router.stack.forEach(print.bind(null, []))


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})