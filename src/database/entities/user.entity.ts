import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatHistory } from './chat-history.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ChatHistory, (chat) => chat.user)
  chatHistory: ChatHistory[];
}
