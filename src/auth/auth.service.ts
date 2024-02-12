/* eslint-disable prettier/prettier */
import { SignInDto } from './dto/signin-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //   SIGN UP

  async signup(createUserDto: CreateUserDto): Promise<any> {
    // Generate a salt for hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Create a new user with the hashed password
    // const newUser = this.userRepository.create({
    const newUser = this.userService.create({
      ...createUserDto,
      password: hashedPassword, // Replace plain text password with hashed password
    });

    return newUser;
  }

  //   SIGN IN

  async signin(signInDto: SignInDto): Promise<{ access_token: string }> {
    // const user = await this.userRepository.findOneBy({
    const user = await this.userService.findByUsername(signInDto.username);

    if (!user) {
      throw new UnauthorizedException(
        "Invalid credentials: user doesn't exist",
      );
    }

    // Compare the hashed password from the database with the hashed version of the provided password
    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials: wrong password');
    }

    // once passwords match create JWT TOKEN AND RETURN IT

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
