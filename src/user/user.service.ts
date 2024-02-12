/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found from service');
    }
    const { password, ...rest } = user;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const { password, ...rest } = savedUser;
    return rest;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.findOne(id);
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    const updatedUser = await this.userRepository.save(user);
    const { password, ...rest } = updatedUser;
    return rest;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
