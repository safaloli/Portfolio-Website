const authRouter = require('express').Router()
const authCtrl = require('../controller/auth.controller')
const bodyValidator = require('../middleware/validator.middleware')
const {RegisterDTO, LoginDTO, UpdateUserDto} = require('../dto/auth.dto')
const uploader = require('../middleware/uploader.middleware')
const loginCheck = require('../middleware/auth.middleware')

// register new user 
authRouter.post('/register', uploader().single('image'), bodyValidator(RegisterDTO), authCtrl.createUser)

// login router
authRouter.post('/login', bodyValidator(LoginDTO), authCtrl.loginUser)
authRouter.get('/me', loginCheck(), authCtrl.getLoggedInUserProfile)

// token activation
authRouter.get('/activate/:token', authCtrl.activateUser)
authRouter.get('/re-activate/:token', authCtrl.resendActivationLink)

// update user
authRouter.patch('/user-edit/:userId', loginCheck(), uploader().single('image'), bodyValidator(UpdateUserDto), authCtrl.updateUserProfile)

// logout
authRouter.post('/logout', loginCheck(), authCtrl.logoutUser)

module.exports = authRouter