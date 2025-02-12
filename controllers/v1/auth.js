const userModel = require('../../models/user')
const banUserModle = require("../../models/ban-phone")
const registerValidator = require("./../../validators/register")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {

    //MAKE SURE THE REQEST BODY VALUS ARE TRUE
    const validationResult = registerValidator(req.body)
    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }
    //TAKE VALUES FROM REQUEST BODY
    const { username, name, email, password, phone } = req.body
    //MAKING A FUNCTION IS THE USERS IS EXIST OR NOT
    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    // CHEAKING THIS PHONE NUMBER IS BANNED OR NOT
    const isUserBan = await banUserModle.find({ phone })
    //RETURN RESPONSE IF USER IS BAN
    if (isUserBan.length) {
        return res.status(409).json({
            message: "This phone number is banned!!"
        })
    }

    if (isUserExist) {
        return res.status(409).json({
            message: "username or email is owned!!"
        })
    }

    //COUNTING USER COLLECTION LENGHT
    const countOfUsers = await userModel.countDocuments()

    // HASHING THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12)
    //CREATING THE USER
    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashedPassword,
        role: countOfUsers > 0 ? "USER" : "ADMIN"
    })

    // DELETEING PASSWORD OBJECT IN RESPONSE
    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, "password")

    //CREATING TOKEN
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day"
    })

    return res.status(201).json({ user: userObject, accessToken })

}
exports.login = async (req, res) => {

    //GET VALUES FROM THE REQUESTS
    const { identifier, password } = req.body
    //CHEACK THE identifier FOR PROPERT EMAIL AND USERNAME IN DATABASE
    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        return res.status(401).json(
            { message: "There is no user with this email or username" })
    }

    //UNHASH THE PASSWORD
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Password is not correct !!!"
        })
    }

    //MAKE ACCESS TOKEN
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30 day"
    })

    return res.json({ accessToken })

}


exports.getME = async (req, res) => {

}










