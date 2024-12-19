import { Table, Column, Model, ForeignKey, DataType } from "sequelize-typescript";
import { Chat } from './chat.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'chat_participants',
})
export class ChatParticipant extends Model<ChatParticipant> {
  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID, allowNull: false })
  chatId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({
    type: 'boolean',
    defaultValue: false,
  })
  isAdmin: boolean;
}
