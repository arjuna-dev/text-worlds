const Joi = require('@hapi/joi')


<<<<<<< HEAD
const registerValidation = data =>{
=======
const signupValidation = data =>{
>>>>>>> feature-add-world
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .required()
            .pattern(/^[a-zA-Z0-9]{3,30}$/),
    
        repeat_password: Joi.ref('password'),
        // access_token: [
        //     Joi.string(),
        //     Joi.number()
        // ],
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2})
        });

    const { error, value } = schema.validate(data);

    return [error, value]
}

const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string()
        .required()
        .email({ minDomainSegments: 2}),
        password: Joi.string()
            .required()
            .pattern(/^[a-zA-Z0-9]{3,30}$/),
        });

    const { error, value } = schema.validate(data);

    return [error, value]
}

<<<<<<< HEAD
module.exports.registerValidation = registerValidation;
=======
module.exports.signupValidation = signupValidation;
>>>>>>> feature-add-world
module.exports.loginValidation = loginValidation;