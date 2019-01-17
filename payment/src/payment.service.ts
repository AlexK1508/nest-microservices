import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { Observable, Subject } from 'rxjs';
import { PaymentStatus } from './common/enums/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  create(data: any): Observable<Payment> {
    const res = new Subject<Payment>();
    this.paymentRepository.save({ orderId: data.id })
      .then(payment => {
        res.next(payment);

        setTimeout(async () => {
          const status: PaymentStatus = Math.random() > 0.5 ? PaymentStatus.CONFIRMED : PaymentStatus.DECLINED;
          const updatedPayment = await this.updateStatus(payment.id, status);
          res.next(updatedPayment);
        }, 500);
      })
      .catch(e => {
        res.error(e);
      });

    return res.asObservable();
  }

  public async updateStatus(id: number, status: PaymentStatus): Promise<Payment> {
    await this.paymentRepository.update(id, { status });
    return this.paymentRepository.findOne(id);
  }
}
