import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { Post, Body,Get,Render } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Render('login') // Specify the name of the EJS file to render
  registerPage() {
    // You can optionally pass data to the view as an object
    return { message: 'Welcome to the login page' };
  }

  @Post('/register')
  async registerUser(@Body() registerUserData: RegisterUserDto) {
    return this.usersService.register(registerUserData);
    }

    @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }


}
