import dataSource from '../data-source';
import { ChatHistory } from '../entities/chat-history.entity';
import { User } from '../entities/user.entity';

const seedChatHistories = async () => {
  const chatHistoryRepository = dataSource.getRepository(ChatHistory);
  const userRepository = dataSource.getRepository(User);

  const users = await userRepository.find();

  if (users.length > 0) {
    const currentTime = new Date();

    const dummyChatHistoryList = users.reduce((chatHistories, user, index) => {
      // Membuat 100 chat untuk setiap user
      const userChatHistories = Array.from({ length: 100 }, (_, chatIndex) => {
        const chatTime = new Date(currentTime.getTime() + (chatIndex * 1000));

        return chatHistoryRepository.create({
          message: `Chat ${chatIndex + 1} for user ${user.id}`,
          user_id: user.id,
          created_at: chatTime,
        });
      });

      return [...chatHistories, ...userChatHistories];
    }, []);

    await chatHistoryRepository.save(dummyChatHistoryList);

    console.log('Chat history seeding completed!');
  } else {
    console.log('No users found to associate chat histories.');
  }
};

export default seedChatHistories;
