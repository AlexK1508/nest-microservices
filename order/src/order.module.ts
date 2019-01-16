import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { ORM_CONFIG } from '../config/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
