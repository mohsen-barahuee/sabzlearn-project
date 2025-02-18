const express = require("express")
const authRouter = require("./routes/auth")
const usersRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const courseRouter = require('./routes/course')
const commentRouter = require("./routes/comment")
const contactRouter = require('./routes/contact')
const newsLetterRouter = require('./routes/newsletter')
const searchRouter = require('./routes/search')
const notificationRouter = require("./routes/notification")
const cors = require('cors')
const path = require('path')
const bodyParses = require("body-parser")
const app = express()


app.use(
    '/courses/covers',
    express.static(path.join(__dirname, "public", 'courses', 'covers')))


app.use(cors())
app.use(bodyParses.json())
app.use(bodyParses.urlencoded({ extended: false }))

//AUTHENTICATION ROUTER
app.use('/v1/auth', authRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/course', courseRouter)
app.use('/v1/comment', commentRouter)
app.use('/v1/contact', contactRouter)
app.use('/v1/newsletter', newsLetterRouter)
app.use('/v1/search', searchRouter)
app.use('/v1/notification', notificationRouter)


module.exports = app