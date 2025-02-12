const userModel = require("../../models/user")
const banUserModel = require('../../models/ban-phone')


exports.banUser = async (req, res) => {

    // FIND THE USER AND RETURN THE COLLECTION IN OBJECT
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean()
    const banUserResult = await banUserModel.create({ phone: mainUser.phone })
    if(banUserModel){
        return res.status(200).json({message : "User ban successfull"})   
    }
    return res.status(500).json({message:"Server Error !!"})
}