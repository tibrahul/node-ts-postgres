import Joi from 'joi';

export const createAddressSchema = Joi.object({
  body: Joi.array().items(Joi.object({
    streetAddress: Joi.string().required().messages({
      'string.base': 'Street Address must be a string',
      'string.empty': 'Street Address is required',
      'any.required': 'Street Address is required',
    }),
    city: Joi.string().required().messages({
      'string.base': 'City must be a string',
      'string.empty': 'City is required',
      'any.required': 'City is required',
    }),
    state: Joi.string().required().messages({
      'string.base': 'State must be a string',
      'string.empty': 'State is required',
      'any.required': 'State is required',
    }),
    postalCode: Joi.string().required().messages({
      'string.base': 'Postal Code must be a string',
      'string.empty': 'Postal Code is required',
      'any.required': 'Postal Code is required',
    }),
    country: Joi.string().required().messages({
      'string.base': 'Country must be a string',
      'string.empty': 'Country is required',
      'any.required': 'Country is required',
    })
  })),
});