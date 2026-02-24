const Joi = require("joi");
const { Status } = require("../config/constants");

const phoneRegex = /^(?:\+977[\s-]?|977[\s-]?)?(98|97|96|91)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/

const contactPageDto = Joi.object({
  section: Joi.string().required(),
  title: Joi.string().allow(null, ""),
  subTitle: Joi.string().allow(null, ""),
  email: Joi.string().email().allow(null, ""),
  phone: Joi.string().regex(phoneRegex).allow(null, ""),
  address: Joi.string().min(2).max(50).allow(null, ""),
  socialLinks: Joi.object({
    facebook: Joi.string().uri().allow(null, ""),
    instagram: Joi.string().uri().allow(null, ""),
    linkedin: Joi.string().uri().allow(null, ""),
    twitter: Joi.string().uri().allow(null, "")
  }).allow(null),
  status: Joi.string().valid(Status.ACTIVE, Status.INACTIVE),
});

module.exports = contactPageDto