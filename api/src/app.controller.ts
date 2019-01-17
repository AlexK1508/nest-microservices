import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

import { MessageCode } from './common/enums/message-code.enum';
import { CreateOrderDto } from './common/dto/order/create-order.dto';

@Controller()
export class AppController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.DEFAULT_HOST || '0.0.0.0',
      port: parseInt(process.env.ORDER_PORT, 10) || 4002,
    },
  })
  private orderClient: ClientProxy;

  @Get('orders/:id')
  public async getOrder(@Param('id') id: number): Promise<any> {
    return this.orderClient.send<any>(MessageCode.GET_ORDER, { id }).toPromise();
  }

  @Post('orders')
  public async createOrder(@Body() data: CreateOrderDto): Promise<any> {
    return this.orderClient.send<any>(MessageCode.CREATE_ORDER, data).toPromise();
  }

  @Patch('orders/:id/cancel')
  public async cancelOrder(@Param('id') id: number): Promise<void> {
    return this.orderClient.send<void>(MessageCode.CANCEL_ORDER, { id }).toPromise();
  }

}
