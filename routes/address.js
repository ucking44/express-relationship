const express = require('express')
const router = express.Router()
const controller = require('../controllers/address')

router.post('/', controller.createAddress)

module.exports = router

