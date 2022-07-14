const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Going extends Model { }

Going.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vendor',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'going'
  }
);

module.exports = Going;