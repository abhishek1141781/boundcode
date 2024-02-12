/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class TresspassingException extends HttpException {
  constructor() {
    super('Mess with ur own stuff', HttpStatus.UNAUTHORIZED);
  }
}
