const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Vendor, Going } = require('../../models');

router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'title',
            'description',
            'date',
            'vendor_name',
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
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
            'date',
            'vendor_name'
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

router.put('/going', (req, res) => {
    Event.going({ ...req.body }, { Going })
    .then(updatedGoingData => res.json(updatedGoingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

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
