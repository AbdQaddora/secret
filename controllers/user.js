const dbConnection = require("../database/config");
var createHttpError = require('http-errors')
const getUserProfile = (req, res, next) => {
}

const getUserSecrets = (req, res, next) => {
    console.log({ user_id: req.user_id })
    res.send("HELLO WORLD")

    const { page } = req.query;
    const user_id = req.user_id;

    const LIMIT = 10;
    const skip = (page - 1) * LIMIT;

    dbConnection('secrets')
        .then(async (secrets) => {
            const result = secrets.find({ user_id }).limit(LIMIT).skip(skip).toArray();

            res.status(200).json({
                status: true,
                data: result
            })
        }).catch((error) => {
            next(createHttpError(500, error.message))
        })
}

const getResponses = (req, res, next) => {
}
const updateProfile = (req, res, next) => {
}

module.exports = {
    getUserProfile,
    getResponses,
    getUserSecrets,
    updateProfile
}