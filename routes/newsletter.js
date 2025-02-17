const express = require('express')
const newsLetterController = require('../controllers/v1/newsletter')
const router = express.Router()


router.route('/')
    .get(newsLetterController.getAll)
    .post(newsLetterController.create)

    

module.exports = router