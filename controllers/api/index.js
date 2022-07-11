const router = require('express').Router();

const vendorRoutes = require('./vendor-routes.js');
const homeRoutes = require('./home-routes.js');

router.use('/vendors', vendorRoutes);
router.use('/', homeRoutes);

module.exports = router;