const Vendor = require('./Vendor');
const Going = require('./Going');
const Event = require('./Event');
const { ValidationError } = require('sequelize/types');

Event.belongsTo(Vendor, {
    foreignKey: 'vendor_id',
    onDelete: 'SET NULL'
});

Event.hasMany(Going, {
    foreignKey: 'going_id'
});

Vendor.hasMany(Event, {
    foreignKey: 'vendor_id'
});

Vendor.belongsToMany(Event, {
    through: Going,
    as: 'going_posts',
    foreignKey: 'vendor_id'
});

Event.belongsToMany(Vendor, {
    through: Going,
    as: 'going_posts',
    foreignKey: 'event_id'
});

module.exports = { Vendor, Going, Event };