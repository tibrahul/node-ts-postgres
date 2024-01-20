import { NextFunction, Request, Response } from 'express';
import { createUser, getAllUser } from '../services/user.service';
import { User } from '../entities/user.entity';

export const createUserHandler = async (
  req: Request<{}, {}, Partial<User>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAllUser();
    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
