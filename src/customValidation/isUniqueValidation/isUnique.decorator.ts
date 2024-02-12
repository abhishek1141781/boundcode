/* eslint-disable prettier/prettier */

import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueConstraint } from './isUnique.class';

// decorator options interface
export type IsUniqeInterface = {
  tableName: string;
  column: string;
};

// decorator function
export function isUnique(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
