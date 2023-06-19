const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next(createHttpError(401, "the request need authorization token"))
        }

        const authorization = req.headers.authorization.split(' ');
        if (!authorization[1]) {
            return next(createHttpError(400, "you need to add token type"));
        }

        const token = authorization[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!payload) {
            return next(createHttpError(401, "invalid token"))
        }

        req.user_id = payload.user_id;
        next();
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

module.exports = {
    global: (app) => {
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
    ,
    auth: authMiddleware
}


