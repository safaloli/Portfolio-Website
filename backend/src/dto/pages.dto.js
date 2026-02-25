const Joi = require('joi')

const PagesDto = Joi.object({
    portfolio_id: Joi.string().uuid().required(),
    title: Joi.string().min(3).max(100).required(),
    slug: Joi.string().max(100).optional(),
    order: Joi.number().integer().min(0).optional(),
})


module.exports = PagesDto