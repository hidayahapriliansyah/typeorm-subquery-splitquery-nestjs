import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatHistory } from '../../database/entities/chat-history.entity';
import { TGetUserWithLastChatHistory } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ChatHistory)
    private chatHistoryRepository: Repository<ChatHistory>,
  ) { }

  async getUserWithLastChatSubquery() {
    console.time('Query Execution Time getUserWithLastChatSubquery');
    const memoryBefore = process.memoryUsage();

    const queryLastChatIdGroupByUser = this.chatHistoryRepository
      .createQueryBuilder('ch')
      .select('MAX(ch.id) id')
      .groupBy('ch.user_id');

    const queryDetailLastChatHistory = this.chatHistoryRepository
      .createQueryBuilder('ch')
      .select([
        'ch.id id',
        'ch.created_at created_at',
        'ch.message message',
        'ch.user_id user_id',
      ])
      .innerJoin(
        '(' + queryLastChatIdGroupByUser.getQuery() + ')',
        'last_chat',
        'last_chat.id=ch.id',
      );

    const queryUserWithLastChatHistory = this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.id user_id',
        'u.name user_name',
        'ch.id last_chat_id',
        'ch.created_at last_chat_created_at',
        'ch.message last_chat_message'
      ])
      .leftJoinAndSelect(
        '(' + queryDetailLastChatHistory.getQuery() + ')',
        'ch',
        'ch.user_id=u.id',
      );

    const result = await queryUserWithLastChatHistory.getRawMany();

    const formattedResult: TGetUserWithLastChatHistory[] = result.map((userWithChat) => ({
      id: userWithChat.user_id,
      name: userWithChat.user_name,
      last_chat: {
        id: userWithChat.last_chat_id,
        created_at: userWithChat.last_chat_created_at,
        message: userWithChat.last_chat_message,
      },
    }));

    const memoryAfter = process.memoryUsage();
    console.log('Memory usage difference (Subquery):', {
      rss: memoryAfter.rss - memoryBefore.rss,
      heapTotal: memoryAfter.heapTotal - memoryBefore.heapTotal,
      heapUsed: memoryAfter.heapUsed - memoryBefore.heapUsed,
      external: memoryAfter.external - memoryBefore.external,
    });
    console.timeEnd('Query Execution Time getUserWithLastChatSubquery');

    return formattedResult;
  }

  async getUserWithLastChatSplitQuery() {
    console.time('Query Execution Time getUserWithLastChatSplitQuery');
    const memoryBefore = process.memoryUsage();

    const users = await this.userRepository.find();

    const userIds = users.map(user => user.id);

    const lastChats = await this.chatHistoryRepository
      .createQueryBuilder('ch')
      .select([
        'ch.user_id',
        'ch.id',
        'ch.created_at',
        'ch.message',
      ])
      .where('ch.user_id IN (:...userIds)', { userIds })
      .andWhere('ch.created_at IN (SELECT MAX(created_at) FROM chat_history WHERE user_id = ch.user_id)')
      .getMany();

    const result = users.map(user => {
      const lastChat = lastChats.find(chat => chat.user_id === user.id);
      return {
        ...user,
        last_chat: lastChat || null,
      };
    });

    const memoryAfter = process.memoryUsage();
    console.log('Memory usage difference (Split Query):', {
      rss: memoryAfter.rss - memoryBefore.rss,
      heapTotal: memoryAfter.heapTotal - memoryBefore.heapTotal,
      heapUsed: memoryAfter.heapUsed - memoryBefore.heapUsed,
      external: memoryAfter.external - memoryBefore.external,
    });
    console.timeEnd('Query Execution Time getUserWithLastChatSplitQuery');

    return result;
  }
}
