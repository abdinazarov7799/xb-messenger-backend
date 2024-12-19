import { Table, Column, Model, DataType, HasMany, Default } from "sequelize-typescript";
import { Message } from '../messages/message.model';
import { ChatParticipant } from './chat-participant.model';

@Table({
  tableName: 'chats',
})
export class Chat extends Model<Chat> {
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUID })
  id: string;

  @Column({
    type: DataType.ENUM('private', 'group'),
    allowNull: false,
  })
  type: 'private' | 'group';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => ChatParticipant)
  participants: ChatParticipant[];
}
