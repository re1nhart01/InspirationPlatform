import { DataTypes } from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";

const ChatData = sequelize.define('ChatData', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    plainMessage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    messageHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: TABLES.USERToUSERChat
  });

  module.exports = ChatData;
