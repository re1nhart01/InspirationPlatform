import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import { IComment } from "../types/modeling";


export class CommentDeclaration extends Model<IComment, Optional<IComment, 'id'>> {
    declare id: number;
    declare creator: string;
    declare comment_hash: string;
    declare post_hash: string;
    declare comment_string: string;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}


export const Comment = CommentDeclaration.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment_string: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: TABLES.COMMENTS
  });
