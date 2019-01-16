import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../../common/dto/order/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async getById(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail(id);
  }

  public async create(data: CreateOrderDto): Promise<Order> {
    return this.orderRepository.save(data);
  }
}
