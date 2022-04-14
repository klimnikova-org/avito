import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(3000);
}
bootstrap();

AppDataSource.initialize()
    .then(() => {})
    .catch((error) => console.log(error));
