import { DataTypes } from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";




export const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true, // Enable timestamps to automatically manage createdAt and updatedAt
    tableName: TABLES.COMMENTS // Optional: specify table name if it's not the default one
  });
