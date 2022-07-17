const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get("/login", (req, res) => {
    res.render('login')
})

router.get('/new-event', (req, res) => {
    res.render('new-event', {
        loggedIn: req.session.loggedIn,
        vendor_id: req.session.vendor_id,
    })
})
  
module.exports = router;