import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentCancel } from './payment-cancel.entity';

@Entity('payment')
export class Payment extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  orderId: string;
  @Column({ type: 'varchar', length: 64 })
  paymentKey: string;
  @Column({ type: 'varchar', length: 100 })
  orderName: string;
  @Column({ type: 'varchar', length: 10 })
  method: string;
  @Column({ type: 'varchar', length: 30 })
  status: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  receiptUrl: string | null;
  @Column({ type: 'varchar', length: 150, nullable: true })
  checkoutUrl: string | null;
  @Column({ type: 'int' })
  totalAmount: number;
  @Column({ type: 'int' })
  vat: number;
  @Column({ type: 'tinyint' })
  isPartialCancelable: boolean;

  // card
  @Column({ type: 'varchar', length: 10, nullable: true })
  issuerCode: string | null;
  @Column({ type: 'varchar', length: 10, nullable: true })
  acquirerCode: string | null;
  @Column({ type: 'varchar', length: 10, nullable: true })
  installmentPlanMonths: number | null;
  @Column({ type: 'varchar', length: 10, nullable: true })
  cardType: string | null;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;

  @OneToMany(() => PaymentCancel, (cancel) => cancel.payment)
  cancels: Promise<PaymentCancel[]>;
}
