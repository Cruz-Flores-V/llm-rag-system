import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './config';

const logger = new Logger('Main');
const port = envs.port;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(port);
}

bootstrap()
  .then(() => {
    logger.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    logger.error('Error starting the server:', error);
  });
