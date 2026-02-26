const mainRouter = require('express').Router()
const authRouter = require('./auth.router')
const pageRouter = require('./page.router')
const portfolioRouter = require('./portfolio.router')
const sectionRouter = require('./section.router')


mainRouter.use('/auth', authRouter)
mainRouter.use('/portfolio', portfolioRouter)
mainRouter.use(pageRouter)
mainRouter.use(sectionRouter)

module.exports = mainRouter