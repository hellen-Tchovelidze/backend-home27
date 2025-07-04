import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sing-up.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  singUp(@Body() SignUpDto: SignUpDto) {
   return this.authService.singup(SignUpDto);
  }

  @Post('sign-in')
  signIn(@Body() SignUpDto: SignUpDto) {
    return this.authService.signIn(SignUpDto);
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId) {
    console.log('req.userId', userId);
    
    return  this.authService.getCurrentUser(userId);
    
  }
}
