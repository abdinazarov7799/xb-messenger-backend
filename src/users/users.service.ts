import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(user: any): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userModel.create(user);
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }
}
