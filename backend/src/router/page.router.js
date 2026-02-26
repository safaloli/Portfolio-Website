const { UserRoles } = require('../config/constants')
const PageCtrl = require('../controller/page.controller')
const {PageDto, UpdatePageDto} = require('../dto/page.dto')
const pageRouter = require('express').Router()
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')

// create pages
pageRouter.post('/:portfolio_slug/page/create', loginCheck(), bodyValidator(PageDto), PageCtrl.createPage)

// update pages 
pageRouter.patch('/:portfolio_slug/:page_slug/edit', loginCheck(), bodyValidator(UpdatePageDto), PageCtrl.updatePage)

// delete pages
pageRouter.delete('/:portfolio_slug/:page_slug', loginCheck(), PageCtrl.deletePage)

// superadmin router
pageRouter.get('/:portfolio_slug/pages/all', loginCheck([UserRoles.ADMIN]), PageCtrl.getAllPagesForAdmin)

// public route
pageRouter.get('/:portfolio_slug/:page_slug', PageCtrl.getPageBySlug)


module.exports = pageRouter