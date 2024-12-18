import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  username: string;

  @Column
  phoneNumber: string;

  @Column
  password: string;
}
