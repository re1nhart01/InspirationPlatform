import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./services/db/sql/driver";

dotenv.config({
    path: "./services/env/.env"
});

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send({
        "isAlive": true,
    })
})


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})