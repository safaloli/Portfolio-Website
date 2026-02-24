const contactPageRouter = require('express').Router()
const contactPageDto = require('../dto/contactPage.dto')
const loginCheck = require('../middleware/auth.middleware')
const bodyValidator = require('../middleware/validator.middleware')
const contactPageCtrl = require('../controller/contactPage.controller')

contactPageRouter.patch('/section-edit/:section', loginCheck(), bodyValidator(contactPageDto), contactPageCtrl.updateContactSection)

module.exports = contactPageRouter