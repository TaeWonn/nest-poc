import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('toss_cancel')
export class PaymentCancel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 64 })
  orderId: string;
  @Column({ type: 'int' })
  cancelAmount: number;
  @Column({ type: 'varchar', length: 200 })
  cancelReason: string;
  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;
  @ManyToOne(() => Payment, (payment) => payment.cancels)
  payment: Promise<Payment>;
}
