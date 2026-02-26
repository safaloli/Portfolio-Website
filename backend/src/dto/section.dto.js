const Joi = require('joi')

const SectionDto = Joi.object({
    type: Joi.string().min(1).max(100).required(),
    content: Joi.object().optional(),
    is_active: Joi.boolean().optional(),
})

const UpdateSectionDto = Joi.object({
    type: Joi.string().min(1).max(100).optional(),
    content: Joi.object().optional(),
    order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional(),
})

const ReorderSectionDto = Joi.object({
    new_order : Joi.number().integer().min(1).required() 
})

// const heroContentSchema = Joi.object({
//     title: Joi.string().required(),
//     subtitle: Joi.string().optional(),
//     background_image: Joi.string().optional()
// })

// const SectionDto = Joi.object({
//     type: Joi.string().required(),
//     content: Joi.when('type', {
//         is: 'hero',
//         then: heroContentSchema,
//         otherwise: Joi.object()
//     })
// })

module.exports = {
    SectionDto,
    UpdateSectionDto,
    ReorderSectionDto,
}