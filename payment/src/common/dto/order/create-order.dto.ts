import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @ApiModelProperty()
  readonly data: string;
}
