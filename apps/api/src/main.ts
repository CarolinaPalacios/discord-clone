import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:4200'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'apollo-require-preflight',
      'X-Requested-With',
    ],
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 1 }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', '
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Discord clone API')
    .setDescription('Discord clone API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('channels')
    .addTag('messages')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
