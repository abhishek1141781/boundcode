/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqeInterface } from './isUnique.decorator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    const { tableName, column }: IsUniqeInterface = args.constraints[0];

    // database query check data is exists
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    // console.log(dataExist);

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field: string = validationArguments.property;
    return `Duplicate value: ${field} already exists`;
  }
}
