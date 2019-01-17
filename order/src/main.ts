import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { ORDER_PORT, DEFAULT_HOST } = process.env;
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: parseInt(ORDER_PORT, 10) || 4002,
      host: DEFAULT_HOST,
      name: 'OrderService',
    },
  });

  app.listen(() => console.log('Order microservice is listening'));
}
bootstrap();
