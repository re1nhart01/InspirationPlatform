import { DataTypes } from "sequelize";
import { sequelize } from "../services/db/sql/driver";


export const UserSubscriptions = sequelize.define('UserSubscriptions', {
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
    socketHash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true, // Enable timestamps to automatically manage createdAt and updatedAt
    tableName: TABLES.SUBSCRIPTIONS // Optional: specify table name if it's not the default one
  });