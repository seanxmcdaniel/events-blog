const Vendor = require('./Vendor');
const Going = require('./Going');
const Event = require('./Event');

Event.belongsTo(Vendor, {
    foreignKey: 'vendor_id',
    onDelete: 'SET NULL'
});

Event.hasMany(Going, {
    foreignKey: 'going_id'
});

Vendor.hasMany(Event, {
    foreignKey: 'event_id'
});

module.exports = { Vendor, Going, Event };