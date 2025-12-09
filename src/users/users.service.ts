import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOrCreate(data: any) {
    let user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      user = new this.userModel(data);
      await user.save();
    }

    return user;
  }
}
