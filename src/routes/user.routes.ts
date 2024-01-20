import express from 'express';
import { createUserHandler, getUserHandler } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.route('/')
  .get(getUserHandler)
  .post(validate(createUserSchema), createUserHandler);

export default router;
