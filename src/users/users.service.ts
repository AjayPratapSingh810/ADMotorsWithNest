import { Injectable, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

  ) {}
  async register(user: RegisterUserDto): Promise<User> {
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log(hash);
    const newUser = new this.userModel({
      name: user.name,
      email: user.email,
      password: hash, // Set the hashed password
    });

    const res = await this.userModel.create(newUser);
    return res;
  }

  async login(user: LoginUserDto): Promise<any> {
    const available = await this.userModel.findOne({ name: user.name });
    if (!available) {
      throw new UnauthorizedException('User is not valid');
    } else {
      const passwordMatch = await bcrypt.compare(
        user.password,
        available.password,
      );
      if (passwordMatch) {
        return available;
      } else {
        throw new UnauthorizedException('password is not valid');
      }
    }
  }
}
