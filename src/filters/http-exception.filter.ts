/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle validation errors
    // if (exception instanceof HttpException && exception.message.message instanceof Array) {
    //   const validationErrors = exception.message.message as ValidationError[];
    if (exception instanceof HttpException && exception instanceof Array) {
      const validationErrors = exception as ValidationError[];
      const errorMessage = this.buildValidationErrorMessage(validationErrors);
      
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message || 'Internal server error',
      });
    }
  }

  private buildValidationErrorMessage(errors: ValidationError[]): string {
    const errorMessages = [];
    for (const error of errors) {
      const constraints = error.constraints;
      if (constraints) {
        errorMessages.push(...Object.values(constraints));
      }
    }
    return errorMessages.join('. ');
  }
}
