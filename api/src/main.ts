import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: { url: 'redis://redis:6379', retryAttempts: 5, retryDelay: 5000 },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(4000);
  console.log('API is listening on port ' + 4000);
}
bootstrap();
