const { Router } = require("express");
const { authController } = require("../controllers");


const router = Router();

router.post('/login', authController.login)
    .post('/signup', authController.signup);

module.exports = router;