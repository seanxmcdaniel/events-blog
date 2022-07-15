const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Vendor, Going } = require('../../models');

router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'vendor_name',
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
        ],
        order: [['date', 'DESC']],
        include: [
            {
                model: Vendor,
                attributes: ['email']
            }
        ]
    })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            //'vendor_name'
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
        ],
        // include: [
        //     {
        //         model: Vendor,
        //         attributes: ['email']
        //     }
        // ]
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
})

// create new event
router.post('/', (req, res) => {
    Event.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        vendor_name: req.body.vendor_name
    })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/events/going
router.put('/going', (req, res) => {
    // custom static method created in models/Post.js
    Event.going(req.body, { Going })
        .then(updatedEventData => res.json(updatedEventData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update event by id
router.put('/:id', (req, res) => {
    Event.update(
        {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            vendor_name: req.body.vendor_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
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
