const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

// CHECKING IS USER IS ADMIN OR NOT MIDDLEWARE
module.exports = async (req, res, next) => {
    //GET authorization VALUE FROM HEADER AND TURN TO ARRAY WITHE SPLITE
    const authHeader = req.header("authorization")?.split(" ")
    if(authHeader?.length !== 2){
        return res.status(403).json({
            message:"This is route is protected and you cant't have access"
        })
    }
    const token = authHeader[1]
    try {        
        //CHECKING IS TOKEN IS VALID OR NOT
        const jwtPayload = jwt.verify(token,process.env.JWT_SECRET)
        //FIND USER IN DATABASE
        const user = await userModel.findById(jwtPayload.id).lean()
        //REMOVE PASSWORD FROM THE OBJECT
        Reflect.deleteProperty(user,"password")
        //SEND USER IN REQUEST FOR NEXT FUNCTION
        req.user = user
        next()

    } catch (error) {
        return res.json({error})
    }
}