const Joi = require("joi");

const userValidation = Joi.object({
  password: Joi.string()
    .required()
    // .pattern(validPassword)
    .messages({
      "string.pattern.base":
        "The password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
      "string.min": "Must have at least 6 characters",
      "string.max": "Must have at least 16 characters",
    })
    .min(6)
    .max(16),

  email: Joi.string().email().required(),
});

const refreshValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  userValidation,
  refreshValidation,
};
