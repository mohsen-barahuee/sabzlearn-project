const userModel = require("../../models/user")
const banUserModel = require('../../models/ban-phone')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

exports.banUser = async (req, res) => {

    // FIND THE USER AND RETURN THE COLLECTION IN OBJECT
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean()
    const banUserResult = await banUserModel.create({ phone: mainUser.phone })
    if (banUserResult) {
        return res.status(200).json({ message: "User ban successfull" })
    }
    return res.status(500).json({ message: "Server Error !!" })
}

exports.getAllUsers = async (req, res) => {

    const allUsers = await userModel.find()

    return res.json({ message: allUsers })

}

exports.removeUser = async (req, res) => {

    // CHECKING THE REQUESTS SENDED IS VALID OR NOT
    const isValidUserID = mongoose.Types.ObjectId.isValid(req.params.id)
    //MAKE CONDITON FOR IT
    if (!isValidUserID) {
        return res.status(409).json({
            message: "User ID is not valid"
        })
    }
    //REMOVE USER FROME THE DATABASE
    const removeUser = await userModel.findByIdAndDelete({ _id: req.params.id })
    //MAKE CONDITION FOR REMOVEUSER IF IT'S NOT VALID
    if (!removeUser) {
        return res.status(404).json({
            message: "User not found !!"
        })
    }
    return res.status(200).json({ message: "User remove successfully :))" })
}

exports.changeRole = async (req, res) => {

    // GET ID IN REQUEST BODY
    const { id } = req.body
    //FIND USER
    const user = await userModel.findOne({ _id: id })

    //MAKE NEW ROLE
    let newRole = user.role === "ADMIN" ? "USER" : "ADMIN"
    //UPDATE USER
    const updateUser = await userModel.findByIdAndUpdate({ _id: id }, { role: newRole })

    return res.json({ message: "User role has been change" })

}

exports.updateUser = async (req,res) => {

    const { name, username, email, password, phone } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id }, { name, username, email, password: hashedPassword, phone })

    // TURN USER TO OBJECT
    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, "password")

    return res.json(userObject)
}