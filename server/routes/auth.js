const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../validation')


router.post('/register',async (req, res) => {

    const regValidation = registerValidation(req.body)

    if (regValidation[0]) return res.status(400).send(regValidation[0].details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists')

    res.send(regValidation[1]);
    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/login',async (req, res) => {

    const lgnValidation = loginValidation(req.body)

    if (lgnValidation[0]) return res.status(400).send(lgnValidation[0].details[0].message)

    res.send(lgnValidation[1]);

});

module.exports = router;