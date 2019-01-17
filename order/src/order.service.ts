import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './common/dto/order/create-order.dto';
import { OrderStatus } from './common/enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async getById(id: number): Promise<Order> {
    return this.orderRepository.findOne(id);
  }

  public async create(data: CreateOrderDto): Promise<Order> {
    return this.orderRepository.save(data);
  }

  public async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await this.orderRepository.update(id, { status });

    if (status === OrderStatus.CONFIRMED) {
      setTimeout(async () => {
        await this.orderRepository.update(id, { status: OrderStatus.DELIVERED });
      }, 1000);
    }
  }
}
