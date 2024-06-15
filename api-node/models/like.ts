import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import {ILike, ISubscription} from "../types/modeling";


class LikeDeclaration extends Model<ILike, Optional<ILike, 'id'>> {
    declare id: number;
    declare creator: string;
    declare post_hash: string;
    declare initiator: string;
    declare created_at: Date;
}

export const Like = LikeDeclaration.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initiator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: TABLES.LIKES
  });
