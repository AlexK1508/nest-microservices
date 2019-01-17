import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatus } from './common/enums/payment-status.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  orderId: number;

  @Column('enum', { enum: PaymentStatus, nullable: false, default: PaymentStatus.IN_PROGRESS })
  status: PaymentStatus;
}
