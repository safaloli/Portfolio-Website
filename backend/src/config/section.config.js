const Joi = require('joi')

const heroSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().allow('').optional(),
    background_image: Joi.string().uri().optional(),
})

const aboutIntroSchema = Joi.object({
    heading: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().optional()
})

const gallerySchema = Joi.object({
    images: Joi.array().items(Joi.string().uri()).min(1).required()
})

const sectionValidationMap = {
    hero: heroSchema,
    about_intro: aboutIntroSchema,
    gallery: gallerySchema,
}

const sectionDefaultContent = {
    hero: {
        title: "Your Name",
        subtitle: "Your Tagline",
        background_image: ""
    },
    about_intro: {
        heading: "About Me",
        description: "Write something about yourself",
        image: ""
    },
    gallery: {
        images: []
    }
}

module.exports = {
    sectionValidationMap,
    sectionDefaultContent
}