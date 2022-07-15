const router = require('express').Router();

router.get('/login', (req, res) => {
    console.log(req.session)
    res.render('homepage');
});
  
module.exports = router;