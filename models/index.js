const Vendor = require('./Vendor');
const Comment = require('./Comment');
const Going = require('./Going');
const Event = require('./Event');

// Associations

Comment.belongsTo(User, {
    foreignKey: 'vendor_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: 'SET NULL'
});

Event.belongsTo(Vendor, {
    foreignKey: 'vendor_id',
    onDelete: 'SET NULL'
});

Event.hasMany(Comment, {
    foreignKey: 'comment_id',
});

Event.hasMany(Going, {
    foreignKey: 'going_id'
});

Vendor.hasMany(Event, {
    foreignKey: 'event_id'
});

Vendor.hasMany(Comment, {
    foreignKey: 'comment_id'
});





module.exports = { Vendor, Comment, Going, Event };