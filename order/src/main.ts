import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://redis:6379',
      retryAttempts: 5,
      retryDelay: 5000,
    },
  });

  app.listen(() => console.log('Order microservice is listening'));
}
bootstrap();
