import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';
import { MessageCode } from '../../common/enums/message-code.enum';
import { Order } from '../../order/src/order.entity';
import { Payment } from './payment.entity';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: MessageCode.CREATE_PAYMENT })
  create(data: Order): Promise<Payment> {
    return this.paymentService.create(data);
  }
}
