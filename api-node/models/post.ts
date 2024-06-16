import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import { IPost } from "../types/modeling";




export class PostDeclaration extends Model<IPost, Optional<IPost, 'id'>> {
    declare id: number;
    declare owner: string;
    declare type: number;
    declare image?: string;
    declare video?: string;
    declare text?: string;
    declare caption: string;
    declare like_id: string;
    declare date_of_creation: Date;
    declare data_count: number;
}


export const Post = PostDeclaration.init({
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
    like_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_creation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    data_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: TABLES.POSTS
  });
