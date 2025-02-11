const app = require("./app")
const mongoose = require('mongoose')
// for Using .env varibles
require('dotenv').config()
const port = process.env.PORT

    (async () => {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected :))")

    })()

app.listen(port, () => {
    console.log(`Server Running On Port : ${port}`)

})
