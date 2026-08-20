import { ExpenseCategory, PaymentMethod, RecurrenceRule } from '@repo/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
    default: ExpenseCategory.Other,
  })
  category: ExpenseCategory;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  isRecurring: boolean;

  @Column({ type: 'enum', enum: RecurrenceRule, nullable: true })
  recurrenceRule: RecurrenceRule | null;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.Other,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
