import { Transport } from '@nestjs/common/enums/transport.enum';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000, port: 4001, host: 'localhost' },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(4000);
}
bootstrap();
