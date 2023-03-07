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
import { MarketItem } from './market-item.entity';

@Entity('market_item_option')
export class MarketItemOption extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'int' })
  marketItemId: number;

  @Column({ type: 'int' })
  additionalPrice: number;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;

  @ManyToOne(() => MarketItem, (item) => item.options, {
    cascade: ['insert'],
  })
  marketItem: MarketItem;
}
