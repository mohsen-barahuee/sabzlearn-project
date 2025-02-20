const courseModel = require("../../models/course")
const offerModel = require('../../models/offer')


exports.getAll = async (req, res) => {

    const allCodes = await offerModel.find()
        .populate("course")
        .populate("creator", "-password")


    return res.json(allCodes)

}

exports.create = async (req, res) => {

    const { code, percent, course, max } = req.body
    const newOff = await offerModel.create({
        code, percent, course, max, uses: 0,
        creator: req.user._id
    })


    return res.status(201).json(newOff)


}

exports.setAllOn = async (req, res) => {

    const { discount } = req.body
    const coursesDiscounts = await courseModel.updateMany({ discount })

    return res.json({ message: "Discont set successfully" })

}



exports.getOne = async (req, res) => {

}



exports.remove = async (req, res) => {

}
