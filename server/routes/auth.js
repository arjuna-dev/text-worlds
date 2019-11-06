const router = require('express').Router();
const User = require('../models/user');
const {registerValidation} = require('../validation')
const Joi = require('@hapi/joi')

// const schema = Joi.object({
//     name: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     password: Joi.string()
//         .required()
//         .pattern(/^[a-zA-Z0-9]{3,30}$/),

//     repeat_password: Joi.ref('password'),
//     // access_token: [
//     //     Joi.string(),
//     //     Joi.number()
//     // ],
//     email: Joi.string()
//         .required()
//         .email({ minDomainSegments: 2})
// });


router.post('/register',async (req, res) => {

    // const { error, value } = schema.validate(req.body);

    const regValidation = registerValidation(req.body)

    if (regValidation[0]) return res.status(400).send(regValidation[0].details[0].message)

    res.send(regValidation[1]);

    // //Create user
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // });
    // try {
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // } catch (error) {
    //     res.status(400).send(error);
    // }
});

module.exports = router;