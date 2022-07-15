const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('homepage');
});

router.get("/login", (req, res) => {
    res.render('login')
})
  
module.exports = router;