const express = require('express')
const router = express.Router()
const searchController = require('../controllers/v1/search')


router.route('/:keyWord')
    .get(searchController.keyWord)







module.exports = router