const router = require('express').Router();
const cors = require("cors")
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(cors())
// Load input validation
const validateRegisterInput   = require("../Validators/register");
const validateLoginInput      = require("../Validators/login");


router.post('/signup',async (req, res) => {
    
    //Check for errors
    //form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.json({error: errors})
    }

    //Check db for existing username
    const nameCheck = await User.findOne({name: req.body.name})
    if(nameCheck){
        errors.name = "Username already exists"
        return res.json({error: errors})
    } 
    //Check db for existing email
    const emailCheck = await User.findOne({email: req.body.email})
    if(emailCheck){
        errors.email = "Email already exists"
        return res.json({error: errors})
    } 

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
        // res.send(savedUser);

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
        res.status(400).json({errors: errors});
    }

});

router.post('/login',async (req, res) => {
    //Check for validation errors
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.json({error: errors})
    }

    //Check db for existing email
    const user = await User.findOne({email: req.body.email})

    if(!user){
        errors.email = "This email is not registered 🤔";
        return res.json({error: errors})
    }

    //Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    console.log(validPassword)
    if (!validPassword){
        errors.password = "Invalid password 🤔"
        return res.json({error: errors})
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    return res.header('auth-token', token).send(token)
});

module.exports = router;