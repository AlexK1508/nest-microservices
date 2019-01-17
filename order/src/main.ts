import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { ORDER_PORT, DEFAULT_HOST } = process.env;
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6385',
    },
  });

  app.listen(() => console.log('Order microservice is listening'));
}
bootstrap();
