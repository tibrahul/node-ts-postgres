import express from 'express';
import { validate } from '../middleware/validate';
import { createAddressSchema } from '../schemas/address.schema';
import { createAddressHandler, createAddressWithUserHandler, getAddressByUserIdHandler, getAddressHandler } from '../controllers/address.controller';

const router = express.Router();

router.route('/')
  .get(getAddressHandler)

router.route('/user/:id')
  .get(getAddressByUserIdHandler)
  .post(validate(createAddressSchema), createAddressWithUserHandler);

export default router;
