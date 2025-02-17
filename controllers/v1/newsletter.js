const newsLetterModel = require('../../models/newsletter')


exports.getAll = async (req, res) => {

    const newsLetter = await newsLetterModel.find()
    return res.status(200).json(newsLetter)

}


exports.create = async (req, res) => {

    const { email } = req.body

    const newsLetter = await newsLetterModel.create({ email })


    return res.status(201).json(newsLetter)

}