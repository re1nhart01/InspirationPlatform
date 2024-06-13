import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
});


