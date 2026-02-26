const { UserRoles } = require('../config/constants')
const sectionCtrl = require('../controller/section.controller')
const {SectionDto, UpdateSectionDto} = require('../dto/section.dto')
const sectionRouter = require('express').Router()
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')

// create sections
sectionRouter.post('/:portfolio_slug/:page_slug/section/create', loginCheck(), bodyValidator(SectionDto), sectionCtrl.createSection)

// update sections 
// sectionRouter.patch('/:portfolio_slug/:section_slug/edit', loginCheck(), bodyValidator(UpdatesectionDto), sectionCtrl.updatesection)

// delete sections
// sectionRouter.delete('/:portfolio_slug/:section_slug', loginCheck(), sectionCtrl.deletesection)

// superadmin router
// sectionRouter.get('/:portfolio_slug/sections/all', loginCheck([UserRoles.ADMIN]), sectionCtrl.getAllsectionsForAdmin)

// public route
// sectionRouter.get('/:portfolio_slug/:section_slug', sectionCtrl.getsectionBySlug)


module.exports = sectionRouter