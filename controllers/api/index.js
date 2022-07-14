const router = require('express').Router();

const vendorRoutes = require('./vendor-routes.js');
const eventRoutes = require('./event-routes.js');

router.use('/vendors', vendorRoutes);
router.use('/events', eventRoutes);

module.exports = router;