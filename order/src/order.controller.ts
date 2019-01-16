import { Controller } from '@nestjs/common';
import { MessagePattern, Transport, Client, ClientProxy } from '@nestjs/microservices';
import { MessageCode } from '../../common/enums/message-code.enum';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../common/dto/order/create-order.dto';
import { Payment } from '../../payment/src/payment.entity';

@Controller()
export class OrderController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4003
    }
  })
  private readonly PaymentClient: ClientProxy;

  constructor(private readonly orderService: OrderService) { }

  @MessagePattern({ cmd: MessageCode.GET_ORDER })
  get(data: { id: number }): Promise<Order> {
    return this.orderService.getById(data.id);
  }

  @MessagePattern({ cmd: MessageCode.CREATE_ORDER })
  async create(data: CreateOrderDto): Promise<Order> {
    const order = await this.orderService.create(data);
    const payment = await this.PaymentClient.send<Payment>({ cmd: MessageCode.CREATE_PAYMENT }, order).toPromise();


    return order;
  }
}
