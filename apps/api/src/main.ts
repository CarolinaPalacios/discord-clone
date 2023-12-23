import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
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

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
