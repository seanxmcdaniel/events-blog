const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

<<<<<<< HEAD
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/new-event', (req, res) => {
    res.render('new-event');
});
=======
router.get("/login", (req, res) => {
    res.render('login')
})
>>>>>>> views
  
module.exports = router;