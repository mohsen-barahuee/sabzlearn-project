const express = require("express")
const offerController = require("../controllers/v1/offer")
const router = express.Router()
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')



router.route('/')
    .get(offerController.getAll)
    .post(authMiddleware, isAdminMiddleware, offerController.create)



router.route("/all")
    .post(authMiddleware, isAdminMiddleware, offerController.setAllOn)


router.route("/:code")
    .post(authMiddleware, offerController.getOne)

router.route("/:id")
    .delete(authMiddleware, offerController.remove)



module.exports = router