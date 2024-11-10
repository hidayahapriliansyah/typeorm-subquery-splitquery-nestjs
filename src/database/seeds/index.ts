import seedUsers from './user.seeder';
import seedChatHistories from './chat-history.seeder';
import dataSource from '../data-source';

const seedDatabase = async () => {
  try {
    await dataSource.initialize();

    await dataSource.query('DELETE FROM chat_history');
    await dataSource.query('DELETE FROM user');

    await seedUsers();
    await seedChatHistories();

    console.log('All seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dataSource.destroy();
  }
};

seedDatabase();
