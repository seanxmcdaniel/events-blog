const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Vendor, Going } = require('../../models');

router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'title',
            'description',
            'location',
            'date',
            'vendor_name',
            //[sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
        ],
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
            'title',
            'description',
            'location',
            'date',
            'vendor_name'
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
        date: req.body.date,
        vendor_name: req.body.vendor_name
    })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update event by id
router.put('/:id', (req, res) => {
    Event.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
