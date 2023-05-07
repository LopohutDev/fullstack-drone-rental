import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4000',
  ];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const port = process.env.PORT || 4000;

  console.log(join(__dirname, '..', 'src', 'uploadedImages'));

  app.use(
    '/public',
    express.static(join(__dirname, '..', 'src', 'uploadedImages')),
  );

  await app.listen(port);
}
bootstrap();
