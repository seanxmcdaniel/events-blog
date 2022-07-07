const router = require('express').Router();
const { Vendor } = require('../../models');

// GET /api/vendors
router.get('/', (req, res) => {
    // Access our Vendor model and run .findAll() method)
    Vendor.findAll()
        .then(dbVendorData => res.json(dbVendorData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/vendors/1
router.get('/:id', (req, res) => {
    Vendor.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbVendorData => {
            if (!dbVendorData) {
                res.status(404).json({ message: 'No vendor found with this id' });
                return;
            }
            res.json(dbVendorData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/vendors
router.post('/', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Vendor.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(dbVendorData => res.json(dbVendorData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/vendors/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Vendor.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbVendorData => {
            if (!dbVendorData[0]) {
                res.status(404).json({ message: 'No vendor found with this id' });
                return;
            }
            res.json(dbVendorData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/vendors/1
router.delete('/:id', (req, res) => {
    Vendor.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbVendorData => {
            if (!dbVendorData) {
                res.status(404).json({ message: 'No vendor found with this id' });
                return;
            }
            res.json(dbVendorData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;