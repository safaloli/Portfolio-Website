const mainRouter = require('express').Router()
const authRouter = require('./auth.router')
const contactPageRouter = require('./contactPage.router')

mainRouter.use('/auth', authRouter)
mainRouter.use('/contact', contactPageRouter)

module.exports = mainRouter