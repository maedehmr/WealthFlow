import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Asset } from '../asset/entities/asset.entity';
import { CurrencyRate } from '../currency-rate/entities/currency-rate.entity';
import { Debt } from '../debt/entities/debt.entity';
import { Expense } from '../expense/entities/expense.entity';
import { Income } from '../income/entities/income.entity';
import { Investment } from '../investment/entities/investment.entity';
import { User } from '../users/entities/user.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Income, Expense, Investment, Asset, Debt, CurrencyRate],
  synchronize: true,
});
