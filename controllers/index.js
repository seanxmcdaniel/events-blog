const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const homepageRoutes = require('./home-routes.js');
const myEventsRoutes = require('./my-events-routes.js');
const newEventRoutes = require('./new-event-routes.js');

router.use('/', homepageRoutes);
router.use('/my-events', myEventsRoutes);
router.use('/new-event', newEventRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;