import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import * as path from "path";

const DOTENV_FILE_PATH =  path.join(__dirname, '..', '..', 'env', '.env');

dotenv.config({
    path: DOTENV_FILE_PATH
});
const DB_URL = process.env.DB_URL;

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
});


sequelize.authenticate().then();
