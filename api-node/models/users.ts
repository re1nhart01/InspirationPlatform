import {DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../services/db/sql/driver";
import {TABLES} from "./index";
import {IUser} from "../types/modeling";


export class UserDeclaration extends Model<IUser, Optional<IUser, 'id'>> {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare avatar: string;
    declare personal_site: string;
    declare gender: string;
    declare description: string;
    declare full_name: string;
    declare location: string;
    declare date_of_birth: string;
    declare is_private: boolean;
    declare token: string;
    declare readonly created_at: Date;
}


export const User = UserDeclaration.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personal_site: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    token: {
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
    tableName: TABLES.USERS
  });


  export const EmptyUser = sequelize.define('EmptyUser', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: TABLES.USERS
  });
