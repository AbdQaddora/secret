require('dotenv').config()
const express = require('express');
const createHttpError = require('http-errors');

const middlewares = require('./middlewares');
const routes = require('./routes');


const app = express();

// 1. middlewares
middlewares.global(app);

// 2. routes
routes(app);

// 3. 404 , not found end point
app.use((req, res, next) => {
    next(createHttpError(404))
})

// 4. global errors middleware
app.use((error, req, res, next) => {
    return res.status(error.statusCode).json({
        status: false,
        message: error.message
    })
})


// global catch for promises
process.on('unhandledRejection', (reason) => {
    console.log({ UN_HANDLED_REJECTION: reason });
    process.exit(1);
})

module.exports = app;