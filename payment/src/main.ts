import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const { PAYMENT_PORT, DEFAULT_HOST } = process.env;
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://localhost:6385`,

    },
  });
  app.listen(() => console.log('Payment microservice is listening'));
}
bootstrap();
