import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';
import { MessageCode } from './common/enums/message-code.enum';
import { Payment } from './payment.entity';
import { Observable } from 'rxjs';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(MessageCode.CREATE_PAYMENT)
  create(data: any): Observable<Payment> {
    return this.paymentService.create(data);
  }
}
