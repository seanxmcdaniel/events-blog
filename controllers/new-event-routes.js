const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event } = require('../models');

router.post('/', (req, res) => {
    Event.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
    })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
  
module.exports = router;