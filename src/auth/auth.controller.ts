/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signin(signInDto);
  }
}
