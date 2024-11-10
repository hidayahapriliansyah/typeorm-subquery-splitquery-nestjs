import dataSource from '../data-source';
import { User } from '../entities/user.entity';

const seedUsers = async () => {
  const userRepository = dataSource.getRepository(User);

  const dummyUsers = Array.from({ length: 100 }, (_, index) => ({
    name: `User ${index + 1}`,
  }));

  await userRepository.save(dummyUsers);

  console.log('User seeding completed!');
};

export default seedUsers;
