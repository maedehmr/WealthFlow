import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';
import { getRedisConfig } from './config/redis.config';
import { CurrencyRateModule } from './currency-rate/currency-rate.module';
import { DebtModule } from './debt/debt.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { InvestmentModule } from './investment/investment.module';
import { OverviewModule } from './overview/overview.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRedisConfig,
    }),
    UsersModule,
    AuthModule,
    IncomeModule,
    ExpenseModule,
    InvestmentModule,
    AssetModule,
    DebtModule,
    OverviewModule,
    CurrencyRateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
