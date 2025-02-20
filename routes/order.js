const express = require("express")
const authMiddleware = require("./../middlewares/auth")
const orderModel = require("../models/order")
const orderController = require("../controllers/v1/order")

const router = express.Router()



router.route('/').get()
router.route('/:id').get()



module.exports = router
