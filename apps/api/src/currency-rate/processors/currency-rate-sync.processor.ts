import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CURRENCY_RATE_SYNC_QUEUE } from '../currency-rate.constants';
import { CurrencyRateSyncService } from '../services/currency-rate-sync.service';

@Processor(CURRENCY_RATE_SYNC_QUEUE)
export class CurrencyRateSyncProcessor extends WorkerHost {
  constructor(private readonly syncService: CurrencyRateSyncService) {
    super();
  }

  async process(): Promise<void> {
    await this.syncService.syncAll();
  }
}
