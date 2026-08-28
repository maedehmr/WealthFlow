import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyRate } from './entities/currency-rate.entity';
import { CurrencyRateController } from './currency-rate.controller';
import { CurrencyRateRepository } from './currency-rate.repository';
import { CurrencyRateService } from './currency-rate.service';
import { CurrencyRateSyncService } from './services/currency-rate-sync.service';
import { CurrencyRateSyncProcessor } from './processors/currency-rate-sync.processor';
import { CurrencyRateSchedulerService } from './currency-rate-scheduler.service';
import { CURRENCY_RATE_SYNC_QUEUE } from './currency-rate.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyRate]),
    BullModule.registerQueue({ name: CURRENCY_RATE_SYNC_QUEUE }),
  ],
  controllers: [CurrencyRateController],
  providers: [
    CurrencyRateService,
    CurrencyRateRepository,
    CurrencyRateSyncService,
    CurrencyRateSyncProcessor,
    CurrencyRateSchedulerService,
  ],
})
export class CurrencyRateModule {}
