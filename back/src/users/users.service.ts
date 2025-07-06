import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private userModel: Model<User>
  ){}

  async create({age, email, fullName}: CreateUserDto) {
    const isAdult = age >= 18 
    const existUser = await this.userModel.findOne({email})
    if(existUser){
      throw new BadRequestException('Email alredy in use')
    }

    const newUser = await this.userModel.create({age, email, fullName, isAdult})

    return {success: 'ok', data: newUser}
  } 

  findAll() {
    return this.userModel.find()
      .populate({path: 'posts', select: 'title desc author'})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {address, age, email, fullName} = updateUserDto
    console.log(address, "adress")
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        address,
        age,
        email,
        fullName
      },
      {
        new: true
      }
    )
    return user
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
