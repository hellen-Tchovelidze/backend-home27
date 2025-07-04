import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sing-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async singup({ age, email, fullName, password }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      fullName,
      email,
      age,
      password: hashedPass,
      isAdult: age >= 18,
    });

    return {
      success: 'ok',
      data: {
        _id: newUser._id,
        fullName,
        email,
        age,
        isAdult: newUser.isAdult,
      },
    };
  }

  async signIn({ email, password }: SignUpDto) {
    const existsUser = await this.userModel
      .findOne({ email })
      .select('password');

    if (!existsUser) {
      throw new BadRequestException('User with this email does not exist');
    }
    const isPassEqual = await bcrypt.compare(password, existsUser.password);
    if (!isPassEqual) {
      throw new BadRequestException('Password is incorrect');
    }

    const payload ={
        id: existsUser._id,
        
    }
    const token = this.jwtService.sign(payload, {expiresIn: '1h'});

    return {token}
  }

  async getCurrentUser(userId){
    const user = await this.userModel.findById(userId)
    return user;
  }
}
