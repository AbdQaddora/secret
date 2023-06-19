const createHttpError = require('http-errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    try {
        User.login(req.body)
            .then(async (result) => {
                if (result.status) {
                    const token = await jwt.sign({
                        user_id: result.data._id
                    }, process.env.JWT_SECRET_KEY)

                    return res.status(200).json({
                        status: true,
                        token: token
                    })
                } else {
                    return next(createHttpError(result.code, result.message))
                }
            })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const signup = (req, res, next) => {
    try {
        const validation = User.validate(req.body);
        if (validation.isValid) {
            const user = new User(req.body);
            user.isExist()
                .then((check) => {
                    if (check.isExist) {
                        return next(createHttpError(409, check.message))
                    } else {
                        user.save()
                            .then(async ({ data }) => {
                                const token = await jwt.sign({
                                    user_id: data._id
                                }, process.env.JWT_SECRET_KEY)

                                res.status(201).json({
                                    status: true,
                                    token: token
                                })
                            })
                    }
                })
        } else {
            return next(createHttpError(400, validation.message))
        }
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

module.exports = {
    login,
    signup
}