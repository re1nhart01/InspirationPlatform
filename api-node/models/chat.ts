import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import { TABLES } from "./index";
import { IChatData } from "../types/modeling";


export class ChatDataDeclaration extends Model<IChatData, Optional<IChatData, 'id'>> {
    declare id: number;
    declare sender: string;
    declare companion: string;
    declare created_at: number;
    declare plain_message: string;
    declare status: number;
    declare type: number;
    declare message_hash: string;
}



export const ChatData = ChatDataDeclaration.init({
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
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    plain_message: {
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
    message_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: TABLES.USERToUSERChat
  });

