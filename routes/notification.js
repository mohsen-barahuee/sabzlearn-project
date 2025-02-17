const express = require('express')
const notificationController = require('../controllers/v1/notification')
const router = express.Router()


router.route("/")
    .post(notificationController.create)

router.route("/:adminID").get(notificationController.get)



module.exports = router