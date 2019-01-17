import { Controller } from '@nestjs/common';
import { Client, ClientProxy, MessagePattern, Transport } from '@nestjs/microservices';
import { MessageCode } from './common/enums/message-code.enum';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from './common/dto/order/create-order.dto';
import { OrderStatus } from './common/enums/order-status.enum';
import { PaymentStatus } from './common/enums/payment-status.enum';

@Controller()
export class OrderController {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6385',
    },
  })
  private readonly PaymentClient: ClientProxy;

  constructor(private readonly orderService: OrderService) { }

  @MessagePattern(MessageCode.GET_ORDER)
  get(data: { id: number }): Promise<Order> {
    return this.orderService.getById(data.id);
  }

  @MessagePattern(MessageCode.CREATE_ORDER)
  async create(data: CreateOrderDto): Promise<Order> {
    const order = await this.orderService.create(data);

    this.PaymentClient.send<any>(MessageCode.CREATE_PAYMENT, order).subscribe(
      (payment: any) => {
        switch (payment.status) {
          case PaymentStatus.CONFIRMED:
            return this.orderService.updateStatus(order.id, OrderStatus.CONFIRMED);
          case PaymentStatus.DECLINED:
            return this.orderService.updateStatus(order.id, OrderStatus.CANCELED);
          default:
            return;
        }
      },
      async (error) => {
        await this.orderService.updateStatus(order.id, OrderStatus.CANCELED);
      },
    );

    return order;
  }

  @MessagePattern(MessageCode.CANCEL_ORDER)
  async cancel(data: { id: number }): Promise<void> {
    await this.orderService.updateStatus(data.id, OrderStatus.CANCELED);
  }
}
