const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const myEventsRoutes = require('./my-events-routes.js');

router.use('/api', apiRoutes);
router.use('/', dashboardRoutes);
router.use('/', myEventsRoutes);

module.exports = router;