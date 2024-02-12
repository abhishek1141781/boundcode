/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { isUnique } from 'src/customValidation/isUniqueValidation/isUnique.decorator';
// import { IsUserAlreadyExist } from 'src/customValidation/unique.decorator';

export class CreateUserDto {
  @isUnique({tableName: 'users', column: 'username'})
  @IsString()
  @IsNotEmpty()
  username: string;

  // @IsUserAlreadyExist()
  @IsString({
    message: 'Password must be a string',
    context: 'should be string only',
  })
  @IsNotEmpty({
    message: 'Password is required',
    context: 'IsNotEmpty: this shouldn"t be left empty',
  })
  @MinLength(10, {
    message: 'Password must be at least 10 characters long',
    context: {
      errorCode: 400,
      developer: 'Developer name: keep on going boi',
    },
  })
  password: string;
}
