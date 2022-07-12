const router = require('express').Router();
const { Event, Vendor, Going } = require('../models');


//get all events for homepage
router.get('/', (req, res) => {
    Event.findAll({
        where: {
            vendor_id: req.session.user_id
        },
        attributes: [
            'title',
            'description',
            'date',
            'vendor_name',
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id'), 'going_count']
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

            res.render('homepage', {
                events,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//get events by id
router.get('/events/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'vendor_name',
            [sequelize.literal('(SELECT COUNT (*) FROM going WHERE event.id = going.event_id)')]
        ],
        include: [
            {
                model: Vendor,
                attributes: ['email']
            }
        ]
    })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'No event found with this id.' });
                return;
            }

            const event = dbEventData.get({ plain: true });

            res.render('single-event', {
                event,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;