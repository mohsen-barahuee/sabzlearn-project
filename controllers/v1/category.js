const categoryModel = require('../../models/category')
const categoryValidators = require('../../validators/category')
const mongoose = require("mongoose")

exports.create = async (req, res) => {

    const validationResult = categoryValidators(req.body)
    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }
    const { title, href } = req.body
    const category = await categoryModel.create({ title, href })

    return res.json({ message: "Category is created :))", category })

}

exports.getAll = async (req, res) => {


    const categories = await categoryModel.find({})
    return res.json({ categories })

}

exports.remove = async (req, res) => {

    const { id } = req.params

    const isCategoryValid = mongoose.Types.ObjectId.isValid(id)

    if (!isCategoryValid) {
        return res.json({ message: "Category is not valid !!!" })
    }

    const deletedCategory = await categoryModel.findByIdAndDelete({
        _id: id
    })

    return res.json({ deletedCategory })

}
exports.update = async (req, res) => {
    const { title, href } = req.body

    const updateCategory = await categoryModel.findOneAndUpdate(
        { _id: req.params.id }, { title, href })

    if (!updateCategory) {
        return res.status(404).json({ message: "Category is not found!!!" })
    }

    return res.status(200).json({message:"Category updated" , updateCategory})

}