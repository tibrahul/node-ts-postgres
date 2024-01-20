import { faker } from '@faker-js/faker';
import { GenderEnumType, User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const userRepository = AppDataSource.getRepository(User);

AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to database...');
    try {
      for (let i = 0; i < 50; i++) {
        const userInput = {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          phoneNumber: faker.helpers.fromRegExp('[0-9]{10}'),
          dob: faker.date.between({ from: '1980-01-01', to: '2000-01-01' }),
          gender: faker.helpers.enumValue(GenderEnumType),
          address: [{
            streetAddress: faker.location.street(),
            city: faker.location.city(),
            country: faker.location.country(),
            postalCode: faker.location.zipCode('######'),
            state: faker.location.state()
          }]
        };

        await userRepository.save(userRepository.create(userInput));
        console.log(`Added User to database`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      process.exit(1);
    }
  })
  .catch((error: any) => console.log(error));