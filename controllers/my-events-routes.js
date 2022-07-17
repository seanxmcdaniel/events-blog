const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, Vendor } = require('../models');

router.get('/', (req, res) => {
    Event.findAll({
         where: {
            vendor_id: req.session.vendor_id
        },
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

            res.render('my-events', {
                events,
                loggedIn: req.session.loggedIn,
                vendor_id: req.session.vendor_id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.delete('/:id', (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }
            res.json(dbEventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;