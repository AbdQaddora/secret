const authRouter = require('./auth');
const userRouter = require('./user');
const secretRouter = require('./secret');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/secret', secretRouter);
}