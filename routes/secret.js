const { Router } = require("express");
const { secretController } = require("../controllers");
const middlewares = require('../middlewares');


const router = Router();

router.post('/send-secret', middlewares.auth, secretController.sendSecret)
    .post('/response-on-secret', middlewares.auth, secretController.responseOnSecret)
    .delete('/:id', middlewares.auth, secretController.responseOnSecret)

module.exports = router;