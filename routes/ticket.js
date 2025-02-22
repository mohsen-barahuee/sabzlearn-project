const express = require("express")
const ticketController = require("../controllers/v1/ticket")
const authMiddleware = require('../middlewares/auth')
const isAdminMiddleware = require('./../middlewares/isAdmin')

const router = express.Router()

router.route('/')
    .post(authMiddleware, ticketController.create)
    .get(authMiddleware, isAdminMiddleware, ticketController.getAll)

router.route('/user').get(authMiddleware, ticketController.userTickets)
router.route('/departments').get(authMiddleware, ticketController.departments)
router.route('/departments-sub/:id').get(authMiddleware, ticketController.departmentsSubs)
router.route('/answer').post(authMiddleware, isAdminMiddleware, ticketController.setAnswer)



module.exports = router