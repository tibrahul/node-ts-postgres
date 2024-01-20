import Joi from 'joi';
import { GenderEnumType } from '../entities/user.entity';

export const createUserSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().required().messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'any.required': 'First Name is required',
    }),
    lastName: Joi.string().required().messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'any.required': 'First Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email address is required',
      'any.required': 'Email address is required',
      'string.email': 'Invalid email address',
    }),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
      'string.pattern.base': 'Invalid Phone Number',
      'string.empty': 'Phone number is required',
      'string.length': 'Phone number must have 10 digits',
      'any.required': 'Phone number is required',
    }),
    dob: Joi.date().valid().max(new Date(Date.now() - 567648000000)).required().messages({
      'date.base': 'dob must be in format YYYY-MM-DD',
      'date.empty': 'dob is required in format YYYY-MM-DD',
      'any.required': 'dob is required in format YYYY-MM-DD',
      'date.max': 'User dob should be greater than 18 years',
    }),
    gender: Joi.string().valid(...Object.values(GenderEnumType)).required().messages({
      'any.only': 'Invalid gender',
      'any.required': 'Gender is required',
    }),
  }),
});