const router = require('express').Router();
const User = require('../models/user');
const {signupValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup',async (req, res) => {
    //Check for errors
    const sgnpValidation = signupValidation(req.body)
    if (sgnpValidation[0]) return res.status(400).send(sgnpValidation[0].details[0].message)

    //Check db for existing email
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists')

    //Send for debugging in postman
    //res.send(sgnpValidation[1]);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();

        const payload = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
          };

        // Sign token
        jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
            res.send(token);
        }
        );

    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/login',async (req, res) => {
    //Check for validation errors
    const lgnValidation = loginValidation(req.body)
    if (lgnValidation[0]) return res.status(400).send(lgnValidation[0].details[0].message)

    //Check db for existing email
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('This email is not registered 🤔')

    //Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password')

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    return res.header('auth-token', token).send(token)
});

module.exports = router;