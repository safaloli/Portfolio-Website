const { UserRoles } = require('../config/constants')
const PagesCtrl = require('../controller/pages.controller')
const {pagesDto, updatepagesDto} = require('../dto/pages.dto')
const pagesRouter = require('express').Router()
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')

// create pages
pagesRouter.post('/create', loginCheck(), bodyValidator(pagesDto), PagesCtrl.createpages)

// update pages 
pagesRouter.patch('/edit/:pages_id', loginCheck(), bodyValidator(updatepagesDto), PagesCtrl.updatepages)

// delete pages
pagesRouter.delete('/delete/:pages_id', loginCheck(), PagesCtrl.deletepages)

// public route
pagesRouter.get('/slug/:slug', PagesCtrl.getpagesBySlug)

// superadmin router
pagesRouter.get('/all', loginCheck([UserRoles.ADMIN]), PagesCtrl.getAllpagesForSuperAdmin)


module.exports = pagesRouter