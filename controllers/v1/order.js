const courseUseModel = require("../../models/course-user")


exports.getAll = async (req, res) => {

    const orders = await courseUseModel
        .find({ user: req.user._id })
        .populate('course', 'name href')
        .populate('user', "username name email phone")
        .lean()


    return res.json({ orders })
}


exports.getOne = async (req, res) => {

    const order = await courseUseModel.findOne({ _id: req.params.id })
        .populate('course')
        .lean()


    return res.json(order)
}