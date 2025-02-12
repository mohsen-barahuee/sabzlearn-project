const express = require("express")
const userController = require("./../controllers/v1/user")
const router = express.Router()
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')

router.route('/')
    .get(authMiddleware, isAdminMiddleware, userController.getAllUsers)
    .put(authMiddleware, isAdminMiddleware, userController.updateUser)

router.route('/ban/:id')
    .post(authMiddleware, isAdminMiddleware, userController.banUser)
    

router.route('/:id')
    .delete(authMiddleware, isAdminMiddleware, userController.removeUser)

router.route('/role')
    .put(authMiddleware, isAdminMiddleware, userController.changeRole)



module.exports = router