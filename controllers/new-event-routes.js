const router = require('express').Router();

router.get('/new-event', (req, res) => {
    console.log(req.session)
    res.render('new-event');
});
  
module.exports = router;