const router = require('express').Router();

const vendorRoutes = require('./vendor-routes.js');

router.use('/vendors', vendorRoutes);

module.exports = router;