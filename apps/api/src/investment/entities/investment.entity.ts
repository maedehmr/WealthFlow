import { InvestmentCategory, RecurrenceRule } from '@repo/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { numberTransformer } from '../../shared/transformers/number.transformer';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: InvestmentCategory,
    default: InvestmentCategory.Gold,
  })
  category: InvestmentCategory;

  @Column({
    type: 'bigint',
    transformer: numberTransformer,
  })
  price: number;

  @Column({ type: 'timestamptz' })
  purchaseDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  broker: string | null;

  @Column({ type: 'boolean', default: false })
  isRecurring: boolean;

  @Column({ type: 'enum', enum: RecurrenceRule, nullable: true })
  recurrenceRule: RecurrenceRule | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 8,
    transformer: numberTransformer,
  })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
