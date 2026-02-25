const Joi = require('joi')

const PortfolioDto = Joi.object({
    slug: Joi.string().min(3).max(100).required(),
    theme: Joi.string().max(50).optional(),
    is_published: Joi.boolean().optional()
})

const updatePortfolioDto = Joi.object({
    slug: Joi.string().min(3).max(100).optional(),
    theme: Joi.string().max(50).optional(),
    is_published: Joi.boolean().optional()
})

module.exports = {
    PortfolioDto,
    updatePortfolioDto
}