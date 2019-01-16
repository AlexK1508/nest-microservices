import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('order/:id')
  public async getOrder(@Param('id') id: number): Promise<Order> {
    const pattern = { cmd: MessageCode.GET_ORDER };
    const data = { id };

    return this.orderClient.send<Order>(pattern, data).toPromise();
  }

  @Post('order')
  public async createOrder(@Body() data: CreateOrderDto): Promise<Order> {
    return this.orderClient.send<Order>({ cmd: MessageCode.CREATE_ORDER }, data).toPromise();
  }
}
