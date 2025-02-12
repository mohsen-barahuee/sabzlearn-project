const express = require("express")
const authRouter = require("./routes/auth")
const usersRouter = require('./routes/user')
const cors = require('cors')
const path = require('path')
const bodyParses = require("body-parser")
const app = express()


app.use(
    '/courses/covers',
    express.static(path.join(__dirname, "public", 'courses', 'covers')))


app.use(cors())
app.use(bodyParses.json())
app.use(bodyParses.urlencoded({extended:false}))

//AUTHENTICATION ROUTER
app.use('/v1/auth', authRouter)
app.use('/v1/users',usersRouter)

module.exports = app