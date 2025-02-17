const contactModel = require('../../models/contact')
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")


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

exports.answer = async (req, res) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nakel3920@gmail.com",
            pass: "test password"//get password from app password in gmail
        }
    })

    const mailOptions = {
        from: "nakel3920@gmail.com",
        to: req.body.email,
        subject: "پاسخ پیغام",
        text: req.body.answer,
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.json({ message: error })
        } else {
            const contact = await contactModel.findOneAndUpdate(
                { email: req.body.email }, { answer: 1 })
            return res.json({ message: "Email sended successfully", info })
        }
    })



}