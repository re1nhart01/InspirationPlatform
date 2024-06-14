import { DataTypes } from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";



export const Like = sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initiator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: TABLES.LIKES
  });
