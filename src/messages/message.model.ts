import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo, Default
} from "sequelize-typescript";
import { Chat } from '../chats/chat.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'messages',
})
export class Message extends Model<Message> {
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID, allowNull: false })
  chatId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  senderId: string;

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
