const app = require("./app")
const mongoose = require('mongoose')
// for Using .env varibles
require('dotenv').config()

//CONNECTION TO DATABASE
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Server Connected To DB Successfully"))
    .catch((error) => console.log(error)
    )

app.get('/', (req, res) => {
    res.json({ message: "ok" })
})

const PORT = process.env.PORT || 3000

//RUNNING SERVER
app.listen(PORT, () => {
    console.log(`Server Running On Port : ${PORT}`)

})
