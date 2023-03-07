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
import { MarketItemOrder } from './market-item-order.entity';

@Entity('market_item_order_option')
export class MarketItemOrderOption extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  optionId: number;

  @Column({ type: 'int' })
  additionalPrice: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;

  @ManyToOne(() => MarketItemOrder, (order) => order.options)
  order: Promise<MarketItemOrder>;
}
