const courseModel = require('../../models/course')



exports.keyWord = async (req, res) => {
    const { keyWord } = req.params

    const courseSearch = await courseModel.find({
        name: { $regex: ".*" + keyWord + ".*" }
    })

    return res.json(courseSearch)


}