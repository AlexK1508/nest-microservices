import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://redis:6379',
      retryAttempts: 5,
      retryDelay: 5000,
    },
  });
  app.listen(() => console.log('Payment microservice is listening'));
}
bootstrap();
