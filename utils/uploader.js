const path = require("path")
const multer = require("multer")
const crypto = require('crypto')

module.exports = multer.diskStorage({
    // make destanation
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'courses', 'covers'))
    },
    //make file name
    filename: (req, file, cb) => {
        // first way to name the file
        const fileName = Date.now() + String(Math.random() * 9999)
        // second way to name the file
        // const hashedFile = crypto.createHash("SHA256").update(file.originalname)
        // .digest("hex")

        const ext = path.extname(file.originalname)
        cb(null, fileName + ext)
    }
})

