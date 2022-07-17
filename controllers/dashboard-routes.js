const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, Vendor } = require('../models');


//get all events for homepage
router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'location',
            'vendor_id',
            'going_count',
        ],
        include: [
            {
                model: Vendor,
                attributes: ['email']
            }
        ]
    })
        .then(dbEventData => {
            const events = dbEventData.map(event => event.get({ plain: true }));

            res.render('dashboard', {
                events
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;