/* eslint-disable prettier/prettier */
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//     ValidatorConstraint,
//     registerDecorator,
//     ValidatorConstraintInterface,
//     ValidationOptions,
//     ValidationArguments,
//   } from 'class-validator';
// import { User } from 'src/user/entities/user.entity';
// import { Repository, getRepository } from 'typeorm';
  
//   @ValidatorConstraint({ async: true })
//   export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

//     constructor(
//         @InjectRepository(User)
//         private readonly userRepository: Repository<User>,
//       ) {}
    

//     validate(userName: any, args: ValidationArguments) {
//     // return this.userRepository.findOneByName(userName).then(user => {
//     //   return getRepository(User).findOne(userName).then(user => {
//     return this.userRepository.findOne(userName).then(user => {
//         if (user) return false;
//         return true;
//       });
//     }
//   }
  
//   export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//     return function (object: object, propertyName: string) {
//       registerDecorator({
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         constraints: [],
//         validator: IsUserAlreadyExistConstraint,
//       });
//     };
//   }