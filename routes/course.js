const express = require("express")
const courseController = require('../controllers/v1/course')
const commentController = require("../controllers/v1/comment")
const multer = require('multer')
const multerStorage = require('../utils/uploader')
const authMiddleware = require("./../middlewares/auth")
const isAdminMiddleware = require('./../middlewares/isAdmin')
const router = express.Router()


router.route("/")
    .post(multer({ storage: multerStorage, limits: { fileSize: 1000000000000 } })
        .single("cover"),
        authMiddleware,
        isAdminMiddleware
        , courseController.create)

router.route('/related/:href').get(authMiddleware, courseController.getRelatedCourse)

router.route('/:href').get(authMiddleware, courseController.getOne)
router.route('/category/:href').get(courseController.getCoursesByCategory)
router.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, courseController.remove)

router.route('/:id/accept').put(authMiddleware, isAdminMiddleware, commentController.AcceptComment)
router.route('/:id/answer').post(authMiddleware, isAdminMiddleware, commentController.answerComment)

router.route("/:id/sessions")
    .post(
        multer({ storage: multerStorage, limits: { fileSize: 1000000000000 } })
            .single("video"),
        authMiddleware,
        isAdminMiddleware,
        courseController.createSession)

router.route('/sessions')
    .get(
        authMiddleware,
        isAdminMiddleware,
        courseController.getAllSessions)

router.route('/sessions/:id')
    .delete(authMiddleware,
        isAdminMiddleware,
        courseController.deleteSession)

router.route("/:href/:sessionID").get(courseController.getSessionInfo)


router.route("/:id/register")
    .post(authMiddleware, courseController.register)




module.exports = router