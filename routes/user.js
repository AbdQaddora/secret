const { Router } = require("express");
const { userController } = require("../controllers");
const middlewares = require('../middlewares');


const router = Router();

router.get('/:id', middlewares.auth, userController.getUserProfile)
    .get('/responses', middlewares.auth, userController.getResponses)
    .get('/secrets', middlewares.auth, userController.getUserSecrets)
    .post('/', middlewares.auth, userController.updateProfile)

module.exports = router;