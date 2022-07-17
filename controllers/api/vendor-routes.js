const router = require('express').Router();
const { Vendor, Event, Going } = require('../../models');

// GET /api/vendors
router.get('/', (req, res) => {
    // Access our Vendor model and run .findAll() method)
    Vendor.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbVendorData => res.json(dbVendorData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/vendors/1
router.get('/:id', (req, res) => {
    Vendor.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Event,
                attributes:
                    [
                        'id',
                        'title',
                        'description',
                        'location',
                        'date',
                        'vendor_id'
                    ]
            },
            {
                model: Event,
                attributes: ['title'],
                through: Going,
                as: 'going_posts'
            }
        ]
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
        .then(dbVendorData => {
            req.session.save(() => {
                req.session.vendor_id = dbVendorData.id;
                req.session.email = dbVendorData.email;
                req.session.loggedIn = true;

                res.json(dbVendorData);
            })})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/vendors/login
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Vendor.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbVendorData => {
        if (!dbVendorData) {
            res.status(400).json({ message: 'No vendor with that email address!' });
            return;
        }

        // Verify vendor
        const validPassword = dbVendorData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.vendor_id = dbVendorData.id;
            req.session.email = dbVendorData.email;
            req.session.loggedIn = true;

        res.json({ vendor: dbVendorData, message: 'You are now logged in!' })});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

// PUT /api/vendors/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Vendor.update(req.body, {
        individualHooks: true,
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