/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'boundcode',
      synchronize: true,
      entities: [User], // Import User entity
    }),
    // TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
