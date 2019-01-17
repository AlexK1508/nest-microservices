import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const { PAYMENT_PORT, DEFAULT_HOST } = process.env; 
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: parseInt(PAYMENT_PORT, 10) || 4003,
      host: DEFAULT_HOST || '0.0.0.0',
      name: 'PaymentService',
    },
  });
  app.listen(() => console.log('Payment microservice is listening'));
}
bootstrap();
