import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Chat } from '../chats/chat.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'messages',
})
export class Message extends Model<Message> {
  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @ForeignKey(() => User)
  @Column
  senderId: number;

  @Column({
    type: DataType.ENUM('text', 'file'),
    allowNull: false,
  })
  mediaType: 'text' | 'file';

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  content: any;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User)
  sender: User;
}
