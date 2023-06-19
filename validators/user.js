const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(4).max(12).alphanum().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
        .message("Your password did't match our rules")
        .required()
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    userSchema,
    loginSchema
}