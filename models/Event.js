const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {
  static going(body, models) {
    return models.Going.create({
      vender_id: body.vendor_id,
      event_id: body.event_id,
    }).then(() => {
      return Event.findOne({
        where: {
          id: body.event_id
        },
        attributes: [
          'id',
          'title',
          'description',
          'location',
          'date',
          'vendor_name',
          [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
        ]
      });
    });
  }
}

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
    vendor_name: {
      type: DataTypes.STRING,
      allowNull: false,
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