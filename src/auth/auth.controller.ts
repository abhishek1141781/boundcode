/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/customValidation/isPublic/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signin(signInDto);
  }

  // @UseGuards(AuthGuard) //protected globally
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
