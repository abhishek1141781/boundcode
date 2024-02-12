/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(parseInt(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // try {
    return await this.userService.create(createUserDto);
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'Failed to create User',
    //       message: error.message,
    //     },
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: error,
    //     },
    //   );
    // }
    // return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    await this.userService.remove(parseInt(id));
    return `User with ID ${id} has been deleted successfully.`;
  }
}
