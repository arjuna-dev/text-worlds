const router = require('express').Router();
const verify = require('./verifyToken');
const user = require('../models/user');

router.get('/', verify,  (req, res) => {
    //How to access user with the id:
    user.findOne({_id: req.user});
    res.send(req.user);
})

module.exports = router;