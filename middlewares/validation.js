const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateItemCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    email: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "email" field is 2',
      "string.max": 'The maximum length of the "email" field is 30',
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "email" field is 2',
      "string.max": 'The maximum length of the "email" field is 30',
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserID = celebrate({
  body: Joi.object().keys({
    itemId: Joi.string().required().min(24).messages({
      "string.min": 'The minimum length of the "itemId" field is 24',
      "string.empty": 'The "itemId" field must be filled in',
    }),
    userId: Joi.string().required().min(24).messages({
      "string.min": 'The minimum length of the "userId" field is 24',
      "string.empty": 'The "userId" field must be filled in',
    }),
  }),
});
