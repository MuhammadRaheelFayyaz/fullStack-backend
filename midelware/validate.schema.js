const Joi = require("joi");
const validation = {
  register: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(6)
  })
  // define all the other schemas below
};
module.exports = validation;
