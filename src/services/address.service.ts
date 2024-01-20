import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const addressRepository = AppDataSource.getRepository(Address);

export const createAddress = async (input: Partial<Address>, user?: Partial<User>) => {
  return await addressRepository.save(addressRepository.create({ ...input, user }));
};

export const getAllAddress = async () => {
  return await addressRepository.find();
};

export const getAddressByUserId = async (id: string) => {
  return await addressRepository.find({
    where: {
      user: {
        id: id
      }
    },
    relations: ['user']
  });
};