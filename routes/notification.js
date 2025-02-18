const express = require('express')
const notificationController = require('../controllers/v1/notification')
const router = express.Router()
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')


router.route("/")
    .post(authMiddleware, isAdminMiddleware, notificationController.create)
    .get(authMiddleware, isAdminMiddleware, notificationController.getAll)


router.route("/admins")
    .get(authMiddleware, isAdminMiddleware, notificationController.get)

router.route("/:id/seen")
    .put(notificationController.seen)



module.exports = router