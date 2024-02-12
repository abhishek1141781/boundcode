/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
// import { TestModule } from './test/test.module';
// import * as ormconfig from '../ormconfig.json'; // Import ormconfig.json

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'boundcode',
      // entities: ['dist/**/*.entity.js'],
      // entities: ['dist/**/*.entity.{ts,js}'],
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      // autoLoadEntities: true,
      entities: [User], // Import User entity
    }),
    UserModule,
  ],
})
export class AppModule {}
