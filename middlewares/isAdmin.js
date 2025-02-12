module.exports = async (req,res,next) => {
    //CHECKING IS IT ADMIN OR NOT
    const isAdmin = req.user.role === "ADMIN"
    if(isAdmin){
        return next()
    }

    return res.status(403).json({
        message:"This route is only for admins"
    })
}