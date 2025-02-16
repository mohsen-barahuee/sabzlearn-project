const commentModel = require('../../models/comment')
const courseModel = require('../../models/course')


exports.createComment = async (req, res) => {

    const { body, courseHref, score } = req.body

    const course = await courseModel.findOne({ href: courseHref }).lean()

    const comment = await commentModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isAnswer: 0,
        isAccept: 0,
    })

    return res.status(201).json(comment)

}


exports.AcceptComment = async (req, res) => {

    const acceptComment = await commentModel.findOneAndUpdate(

        { _id: req.params.id }
        , { isAccept: 1 }
    )

    if (!acceptComment) {
        return res.status(404).json({ message: "Comment not found!!!" })
    }

    return res.json({ message: "Comment updated :))" })

}


exports.answerComment = async (req, res) => {

    const { body } = req.body
    const acceptComment = await commentModel.findOneAndUpdate(

        { _id: req.params.id }
        , { isAccept: 1 }
    )

    const answerComment = await commentModel.create({
        body,
        course: acceptComment.course,
        creator: req.user._id,
        isAnswer: 1,
        isAccept: 1,
        mainCommentID: req.params.id
    })

    return res.status(201).json({ message: "Comment is answered" })

}