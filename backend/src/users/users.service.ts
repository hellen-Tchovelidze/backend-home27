import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async create({ age, fullName, email }: CreateUserDto) {
    const isAdult = age >= 18;
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      return { error: 'User with this email already exists' };
    }
    const newUser = await this.userModel.create({
      fullName,
      email,
      age,
      isAdult,
    });
    return { succsess: 'ok', data: newUser };
  }

  findAll() {
    return this.userModel.find().populate({ path: 'posts', select: 'title' });
  }

  findOne(id: number) {

    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { fullName, email, age, address } = updateUserDto;
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { fullName, email, age, address },
      { new: true },
    );
    return user;
  }

  async changeUserRole(userId: string, newRole: 'admin' | 'user'): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }, 
    );

    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
