/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entity';
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
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      entities: [User], // Import User entity
    }),
    UserModule,
  ],
})
export class AppModule {}
