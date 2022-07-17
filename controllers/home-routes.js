const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/new-event', (req, res) => {
    res.render('new-event');
});
  
module.exports = router;