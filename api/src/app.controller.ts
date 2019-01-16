import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { MessageCode } from '../../common/enums/message-code.enum';
import { CreateOrderDto } from '../../common/dto/order/create-order.dto';
import { Order } from '../../order/src/order.entity';

@Controller()
export class AppController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4002
    }
  })
  private orderClient: ClientProxy;

  @Get('orders/:id')
  public async getOrder(@Param('id') id: number): Promise<Order> {
    return this.orderClient.send<Order>(MessageCode.GET_ORDER, { id }).toPromise();
  }

  @Post('orders')
  public async createOrder(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderClient.send<Order>(MessageCode.CREATE_ORDER, data).toPromise();
  }

  @Patch('orders/:id/cancel')
  public async cancelOrder(@Param('id') id: number): Promise<void> {
    return this.orderClient.send<void>(MessageCode.CANCEL_ORDER, { id }).toPromise();
  }
}
