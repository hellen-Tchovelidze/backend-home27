import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto)
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId){
    return this.authService.getCurrentUser(userId)
  }
}
