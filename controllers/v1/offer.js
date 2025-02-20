const courseModel = require("../../models/course")
const offerModel = require('../../models/offer')
const mongoose = require('mongoose')


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

    const { code } = req.params
    const { course } = req.body

    if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.json({ message: "course value is not valid" })
    }
    const off = await offerModel.findOne({ code, course })

    if (!off) {
        return res.status(404).json({ message: "invalid code !!!" })
    } else if (off.max === off.uses) {
        return res.json({ message: "you cant use this code anymore " })
    } else {
        await offerModel.findOneAndUpdate({ code, course }, { uses: off.uses + 1 })

        return res.json({ message: "code activated " })
    }

}

exports.remove = async (req, res) => {

}
