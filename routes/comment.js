const express = require("express")
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')
const commentController = require('../controllers/v1/comment')
const router = express.Router()

router.route('/').post(
    authMiddleware, commentController.createComment)


module.exports = router