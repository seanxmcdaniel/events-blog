const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, Vendor, Going } = require('../models');

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
            //[sequelize.literal('(SELECT COUNT (*) FROM going WHERE event.id = going.event_id)')]
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

router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id'});
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;