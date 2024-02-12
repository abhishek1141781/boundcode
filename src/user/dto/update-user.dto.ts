/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { isUnique } from 'src/customValidation/isUniqueValidation/isUnique.decorator';

export class UpdateUserDto {
  @isUnique({tableName: 'user', column: 'username'})
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
