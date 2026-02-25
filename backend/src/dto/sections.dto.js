const Joi = require('joi')

const SectionsDto = Joi.object({
    page_id: Joi.string().uuid().required(),
    type: Joi.string().min(3).max(100).required(),
    content: Joi.string().optional(),
    order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional(),
})

module.exports = SectionsDto