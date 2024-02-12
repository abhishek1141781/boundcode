/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  // app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  
  app.useGlobalPipes(new ValidationPipe());
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // because of using this we're not getting custom error from custom validation msgs
  // app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors) => {
  //       const result = errors.map((error) => ({
  //         property: error.property,
  //         message: error.constraints[Object.keys(error.constraints)[0]],
  //       }));
  //       return new BadRequestException(result);
  //     },
  //     stopAtFirstError: true,
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
