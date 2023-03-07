import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarketItemOrderStatus } from './market-item-order.type';
import { MarketItemOrderOption } from './market-item-order-option.entity';
import { MarketItem } from './market-item.entity';

@Entity({ name: 'market_item_order' })
export class MarketItemOrder extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  contactPhone: string;

  @Column({ type: 'varchar', length: 30 })
  status: MarketItemOrderStatus;

  @Column({ type: 'int' })
  totalPrice: number;

  @Column({ type: 'int' })
  buyerId: number;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;

  @OneToMany(() => MarketItemOrderOption, (option) => option.order, {
    cascade: ['insert'],
  })
  options: Promise<MarketItemOrderOption[]>;

  @ManyToOne(() => MarketItem)
  marketItem: Promise<MarketItem>;
}
