import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import { ISubscription } from "../types/modeling";


export class UserSubscriptionsDeclaration extends Model<ISubscription, Optional<ISubscription, 'id'>> {
    declare id: number;
    declare maker: string;
    declare subscriber: string;
    declare status: number;
    declare socket_hash?: string;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

export const UserSubscriptions = UserSubscriptionsDeclaration.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscriber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    socket_hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: TABLES.SUBSCRIPTIONS
  });
