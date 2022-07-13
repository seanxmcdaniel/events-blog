const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, Vendor, Going } = require('../models');


//get all events for homepage
router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'title',
            'description',
            'date',
            'location',
            'vendor_name',
            //[sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id'), 'going_count']
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
                events,
                //loggedIn: req.session.loggedIn
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