const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Vendor, Going } = require('../../models');

router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'vendor_name',
            'event_url',
            'vendor_id',
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id)'), 'going_count']
        ],
        include: [
            {
                model: Vendor,
                attributes: ['username']
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
            'date',
            'vendor_name',
            'event_url',
            'vendor_id',
            [sequelize.literal('(SELECT COUNT(*) FROM going WHERE event.id = going.event_id'), 'going_count']
        ],
        include: [
            {
                model: Vendor,
                attributes: ['email']
            }
        ]
    })
})

router.post('/', (req, res) => {
    Event.create({
        title: req.body
    })
})

module.exports = router;
