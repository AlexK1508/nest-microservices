import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: 4002,
      host: 'localhost',
      name: 'OrderService'
    },
  });
  app.listen(() => console.log('Order microservice is listening'));
}
bootstrap();
