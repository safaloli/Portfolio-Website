const { UserRoles } = require('../config/constants')
const portfolioCtrl = require('../controller/portfolio.controller')
const {PortfolioDto, updatePortfolioDto} = require('../dto/portfolio.dto')
const portfolioRouter = require('express').Router()
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')

// create portfolio
portfolioRouter.post('/create', loginCheck(), bodyValidator(PortfolioDto), portfolioCtrl.createPortfolio)

// update portfolio 
portfolioRouter.patch('/edit/:portfolio_id', loginCheck(), bodyValidator(updatePortfolioDto), portfolioCtrl.updatePortfolio)

// delete portfolio
portfolioRouter.delete('/delete/:portfolio_id', loginCheck(), portfolioCtrl.deletePortfolio)

// public route
portfolioRouter.get('/slug/:slug', portfolioCtrl.getPortfolioBySlug)

// superadmin router
portfolioRouter.get('/all', loginCheck([UserRoles.ADMIN]), portfolioCtrl.getAllPortfolioForSuperAdmin)
module.exports = portfolioRouter