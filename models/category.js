const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    href: {
        type: String,
        require: true
    }
})


const model = mongoose.model("Category",schema)

module.exports = model