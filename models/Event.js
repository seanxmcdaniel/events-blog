const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Vendor = require('./Vendor');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vendor",
        key: "id"
      }
    },
    going_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
    updatedAt: false
  }
);

module.exports = Event;