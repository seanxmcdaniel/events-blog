const router = require('express').Router();

router.get('/new-event', (req, res) => {
    res.render('new-event');
});
  
module.exports = router;