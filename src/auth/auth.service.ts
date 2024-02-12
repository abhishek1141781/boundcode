import { SignInDto } from './dto/signin-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private userService: UserService,
    // private jwtService: JwtService
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

    // // Save the user to the database
    // const savedUser = await this.userRepository.save(newUser);

    return newUser
  }


  
//   SIGN IN

  async signin(signInDto: SignInDto): Promise<any> {
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

    // If passwords match, remove the password field from the user object before returning
    const { password, ...result } = user;

    // Return the user object without the password
    return result;
  }

  //   async signin(createUserDto: CreateUserDto): Promise<any> {
  //     const user = await this.userRepository.findOneBy(createUserDto);

  //     if (user?.password !== createUserDto.password) {
  //       throw new UnauthorizedException();
  //     }
  //     const { password, ...result } = user;
  //     // TODO: Generate a JWT and return it here
  //     // instead of the user object
  //     return result;
  //   }
}
