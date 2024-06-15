import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import { IPost } from "../types/modeling";




export class PostDeclaration extends Model<IPost, Optional<IPost, 'id'>> {
    public id!: number;
    public owner!: string;
    public type!: number;
    public image?: string;
    public video?: string;
    public text!: string;
    public caption!: string;
    public like_id!: string;
    public date_of_creation!: Date;
    public data_count!: number;
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
