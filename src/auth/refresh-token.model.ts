import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  tableName: 'refresh_tokens',
})
export class RefreshToken extends Model<RefreshToken> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column(DataType.STRING)
  token: string;

  @Column(DataType.DATE)
  expires: Date;
}
