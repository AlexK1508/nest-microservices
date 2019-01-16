import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { Order } from '../../order/src/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(data: Order): Promise<Payment> {
    return this.paymentRepository.save({ orderId: data.id });
  }

}
