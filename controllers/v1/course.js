const courseModel = require('./../../models/course')
const sessionModel = require('./../../models/session')
const courseUserModel = require("../../models/course-user")


exports.create = async (req, res) => {
    const {
        name, description, support, href, price, status, discount, categoryID,
    } = req.body

    const course = await courseModel.create({
        name,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.user._id,
    })

    const mainCourse = await courseModel.findById(course._id).populate("creator", '-password ')

    return res.status(201).json(mainCourse)


}

exports.createSession = async (req, res) => {


    try {
        const { title, free, time } = req.body
        const { id } = req.params


        const session = await sessionModel.create({
            title,
            time,
            free,
            video: req.file.filename, // we get req.file.filename becuz we use multer as middleware
            course: id,
        })

        return res.status(201).json(session)

    } catch (error) {
        console.log(error);

    }


}

exports.getAllSessions = async (req, res) => {

    const allSessions = await sessionModel.find().populate("course").lean()
    return res.status(200).json(allSessions)

}

exports.getSessionInfo = async (req, res) => {


    const course = await courseModel.findOne({ href: req.params.href }).lean()

    const session = await sessionModel.findOne({ _id: req.params.sessionID })

    const sessions = await sessionModel.find({ course: course._id })

    return res.json({ session, sessions })

}


exports.deleteSession = async (req, res) => {


    const deletedCourse = await sessionModel.findOneAndDelete({
        _id: req.params.id
    })

    if (!deletedCourse) {
        return res.status(404).json({ message: "not found !!!" })
    }

    return res.status(200).json({ message: "Course Deleted", deletedCourse })

}


exports.register = async (req, res) => {

    const isUserAlreadyRegister = await courseUserModel.findOne({
        user: req.user._id,
        course: req.params.id
    }).lean()

    if (isUserAlreadyRegister) {
        return res.status(409).json({
            message: "user is already use this course"
        })
    }

    const register = await courseUserModel.create({
        user: req.user._id,
        course: req.params.id,
        price: req.body.price
    })

    return res.status(201).json({
        message: "user is reagister successfully :))"
    })


}
