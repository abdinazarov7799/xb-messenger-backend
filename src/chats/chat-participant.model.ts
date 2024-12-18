import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Chat } from './chat.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'chat_participants',
})
export class ChatParticipant extends Model<ChatParticipant> {
  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({
    type: 'boolean',
    defaultValue: false,
  })
  isAdmin: boolean;
}
