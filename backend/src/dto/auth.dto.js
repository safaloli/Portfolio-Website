const Joi = require('joi')

const LoginDTO = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().required()
})

const phoneRegex = /^(?:\+977[\s-]?|977[\s-]?)?(98|97|96|91)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W@_-]).{8,50}$/

const RegisterDTO = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": "Name should be at least of 3 character long",
        "string.max": "Name can be more than 50 character long"
    }),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required().messages({
        "string.pattern.base": "Password must contain at least 1 small letter, 1 capital letter, 1 special character, 1 number and should be 8-25 character long" 
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    address: Joi.string().allow(null, "").optional().default(null),
    phone: Joi.string().regex(phoneRegex).required().messages({
        "string.pattern.base": "Should only support the mobile number format from Nepal",
    }),
    role: Joi.string().regex(/^(user)$/).default('user').messages({
        "string.pattern.base": "Role must be user.",
    }),
    image: Joi.string().allow(null, "").optional().default(null),
})

module.exports = {
    RegisterDTO,
    LoginDTO,
}

