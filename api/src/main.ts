import { NestFactory } from '@nestjs/core';
import * as dotEnv from 'dotenv';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  dotEnv.config();
  const { API_PORT, API_TCP_PORT, DEFAULT_HOST } = process.env;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6385',
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(parseInt(API_PORT, 10) || 4000);
  console.log('API is listening on port ' + API_PORT);
}
bootstrap();
