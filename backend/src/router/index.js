const mainRouter = require('express').Router()
const authRouter = require('./auth.router')

mainRouter.use('/auth', authRouter)

module.exports = mainRouter