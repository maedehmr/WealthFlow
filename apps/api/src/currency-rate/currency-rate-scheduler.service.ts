import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  CURRENCY_RATE_SYNC_INTERVAL_MS,
  CURRENCY_RATE_SYNC_JOB,
  CURRENCY_RATE_SYNC_QUEUE,
} from './currency-rate.constants';

@Injectable()
export class CurrencyRateSchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue(CURRENCY_RATE_SYNC_QUEUE) private readonly queue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.queue.upsertJobScheduler(
      CURRENCY_RATE_SYNC_QUEUE,
      { every: CURRENCY_RATE_SYNC_INTERVAL_MS },
      { name: CURRENCY_RATE_SYNC_JOB, data: {} },
    );
  }
}
