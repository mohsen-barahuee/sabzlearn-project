const mongoose = require("mongoose")

const shcema = new mongoose.Schema({
 
    phone: {
        type: String,
        required: true
    },
    
}, { timestamps: true })

const model = mongoose.model("BanUser",shcema)

module.exports = model