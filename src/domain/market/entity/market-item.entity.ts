import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarketItemStatus } from './market-item.type';
import { MarketItemOption } from './market-item-option.entity';

@Entity({ name: 'market_item' })
export class MarketItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 40 })
  status: MarketItemStatus;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'simple-array' })
  images: string[];

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;

  @OneToMany(() => MarketItemOption, (option) => option.marketItem, {
    cascade: ['insert'],
  })
  @JoinColumn()
  options: Promise<MarketItemOption[]>;
}
