import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  nickname: string;

  @Column({ type: 'bigint', unique: true })
  kakaoUserId: number;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date | null;
}
