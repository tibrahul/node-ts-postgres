import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

const handleJoiValidationError = (error: ValidationError, res: Response) => {
  const errorMessage = error.details.map((detail) => ({ [detail.context?.key || "message"]: detail.message }));

  return res.status(400).json({
    status: 'fail',
    errors: errorMessage,
  });
}

export const validate = (schema: Joi.ObjectSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate({
      body: req.body,
    }, {
      abortEarly: false
    })

    if (!error) {
      req.body = value.body;

      next();
    } else {
      handleJoiValidationError(error, res);
    }
  };
