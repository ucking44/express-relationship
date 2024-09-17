const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/sign-up', userController.signUp)
router.post('/signin', userController.singin)
router.post('/login', userController.login)
router.post('/signing-up', userController.signingUp)
router.get('/:id', userController.fetchUserById)


module.exports = router

