const Joi = require('joi')

const PageDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    slug: Joi.string().max(100).required(),
    order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional(),
})
const UpdatePageDto = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    slug: Joi.string().max(100).optional(),
    order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional(),
})


module.exports = {
    PageDto,
    UpdatePageDto
}