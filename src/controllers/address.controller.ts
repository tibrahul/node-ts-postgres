import { NextFunction, Request, Response } from 'express';
import { createAddress, getAddressByUserId, getAllAddress } from '../services/address.service';
import { Address } from '../entities/address.entity';
import { createUser } from '../services/user.service';

export const createAddressHandler = async (
  req: Request<{}, {}, Partial<Address>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await createAddress(req.body);
    res.status(200).status(200).json({
      status: 'success',
      data: {
        address,
      },
    });
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const createAddressWithUserHandler = async (
  req: Request<{
    id: string
  }, {}, Address[]>,
  res: Response,
  next: NextFunction
) => {
  try {

    const address = await createUser({
      id: req.params.id,
      address: req.body
    })

    res.status(200).status(200).json({
      status: 'success',
      data: {
        address,
      },
    });
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const getAddressByUserIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await getAddressByUserId(req.params.id);
    res.status(200).status(200).json({
      status: 'success',
      data: {
        address,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const getAddressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await getAllAddress();
    res.status(200).status(200).json({
      status: 'success',
      data: {
        address,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
