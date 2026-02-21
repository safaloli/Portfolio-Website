const authRouter = require('express').Router()
const authCtrl = require('../controller/auth.controller')
const bodyValidator = require('../middleware/validator.middleware')
const {RegisterDTO, LoginDTO} = require('../dto/auth.dto')
const uploader = require('../middleware/uploader.middleware')
const loginCheck = require('../middleware/auth.middleware')

// register new user 
authRouter.post('/register', loginCheck(), uploader().single('image'), bodyValidator(RegisterDTO), authCtrl.createUser)

// login router
authRouter.post('/login', loginCheck(), bodyValidator(LoginDTO), authCtrl.loginUser)

module.exports = authRouter