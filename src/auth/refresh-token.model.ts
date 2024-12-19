import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  tableName: 'refresh_tokens',
})
export class RefreshToken extends Model<RefreshToken> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column(DataType.STRING)
  token: string;

  @Column(DataType.DATE)
  expires: Date;
}
