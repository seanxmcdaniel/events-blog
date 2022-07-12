const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        vendor_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isURL: true
            }
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'vendor',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;