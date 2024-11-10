import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../../database/entities/user.entity';
import { ChatHistory } from '../../database/entities/chat-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChatHistory])],
  controllers: [UserController],
  providers: [UserService],
})
// eslint-disable-next-line prettier/prettier
export class UserModule { }
