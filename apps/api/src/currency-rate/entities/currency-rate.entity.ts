import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { numberTransformer } from '../../shared/transformers/number.transformer';

@Entity('currency_rates')
export class CurrencyRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  code: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: numberTransformer,
  })
  rate: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  source: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
