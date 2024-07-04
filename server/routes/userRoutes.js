const express = require('express')
const { registerController, loginController, resetPasswordController } = require('../controllers/userController')

const router = express.Router()

//route for user registration
router.post('/register', registerController)

//route for user login
router.post('/login', loginController)

//route for resetting password
router.post('/reset-password', resetPasswordController)

module.exports = router

