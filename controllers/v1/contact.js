const contactModel = require('../../models/contact')
const mongoose = require("mongoose")


exports.getAll = async (req, res) => {

    const contacts = await contactModel.find()


    return res.json({ contacts })

}
exports.create = async (req, res) => {

    const { name, email, phone, body, } = req.body

    const contact = await contactModel.create({
        name, email, phone, answer: 0, body,
    })

    return res.status(201).json(contact)
}
exports.remove = async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isIdValid) {
        return res.status(409).json({
            message: "Data is not valid !!!"
        })
    }

    const deletedContact = await contactModel.findOneAndDelete({
        _id: req.params.id
    })

    if (!deletedContact) {
        return res.status(404).json({
            message: "Comment Not Found !!!"
        })
    }

    return res.status(200).json({
        message: deletedContact
    })

}

