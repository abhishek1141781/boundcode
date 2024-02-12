/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { IsUniqueConstraint } from 'src/customValidation/isUniqueValidation/isUnique.class';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, IsUniqueConstraint],
  controllers: [UserController],
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}
