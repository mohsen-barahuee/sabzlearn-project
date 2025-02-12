const express = require('express')
const router = express.Router()
const categoryController = require("../controllers/v1/category")
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')



router.route('/')
    .post( categoryController.create)
    .get(categoryController.getAll)


router.route('/:id')
    .delete(authMiddleware, isAdminMiddleware, categoryController.remove)
    .put(authMiddleware, isAdminMiddleware, categoryController.update)



module.exports = router