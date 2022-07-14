const router = require('express').Router();

const vendorRoutes = require('./vendor-routes.js');
const eventRoutes = require('./event-routes.js');
const goingRoutes = require('./going-route.js')

router.use('/vendors', vendorRoutes);
router.use('/events', eventRoutes);
router.use('/going', goingRoutes);

module.exports = router;