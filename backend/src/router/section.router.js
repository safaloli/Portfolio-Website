const { UserRoles } = require('../config/constants')
const sectionCtrl = require('../controller/section.controller')
const {SectionDto, UpdateSectionDto, ReorderSectionDto} = require('../dto/section.dto')
const sectionRouter = require('express').Router()
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')

// create sections
sectionRouter.post('/:portfolio_slug/:page_slug/section/create', loginCheck(), bodyValidator(SectionDto), sectionCtrl.createSection)

// reorder sections
sectionRouter.patch('/:portfolio_slug/:page_slug/:section_id/reorder', loginCheck(), bodyValidator(ReorderSectionDto), sectionCtrl.reorderSections)

// update sections 
sectionRouter.patch('/:portfolio_slug/:page_slug/:section_id/edit', loginCheck(), bodyValidator(UpdateSectionDto), sectionCtrl.updateSection)

// delete sections
sectionRouter.delete('/:portfolio_slug/:page_slug/:section_id', loginCheck(), sectionCtrl.deleteSection)

// superadmin router
sectionRouter.get('/:portfolio_slug/:page_slug/sections/all', sectionCtrl.getAllSections)

// public route
sectionRouter.get('/:portfolio_slug/:page_slug/:section_id', sectionCtrl.getSection)


module.exports = sectionRouter