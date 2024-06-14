import { DataTypes } from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";




export const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    dataCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: TABLES.POSTS
  });
