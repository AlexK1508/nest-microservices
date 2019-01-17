import { Transport } from '@nestjs/common/enums/transport.enum';
import { NestFactory } from '@nestjs/core';
import * as dotEnv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  dotEnv.config();
  const { API_PORT, API_TCP_PORT, DEFAULT_HOST } = process.env;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: parseInt(API_TCP_PORT, 10) || 4001,
      host: DEFAULT_HOST || '0.0.0.0',
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(parseInt(API_PORT, 10) || 4000);
  console.log('API is listening on port ' + API_PORT);
}
bootstrap();
