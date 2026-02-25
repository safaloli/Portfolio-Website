const mainRouter = require('express').Router()
const authRouter = require('./auth.router')
const portfolioRouter = require('./portfolio.router')

mainRouter.use('/auth', authRouter)
mainRouter.use('/portfolio', portfolioRouter)

module.exports = mainRouter