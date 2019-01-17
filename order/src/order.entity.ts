import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './common/enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: OrderStatus, nullable: false, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Column({ type: 'text', nullable: false })
  data: string;
}
