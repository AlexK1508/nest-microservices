import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: 4003,
      host: 'localhost',
      name: 'PaymentService'
    },
  });
  app.listen(() => console.log('Payment microservice is listening'));
}
bootstrap();
