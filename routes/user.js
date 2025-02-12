const express = require("express")
const userController = require("./../controllers/v1/user")
const router = express.Router()
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')

router.route('/ban/:id')
    .post(authMiddleware, isAdminMiddleware, userController.banUser)


module.exports = router