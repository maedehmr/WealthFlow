import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RATE_CODE_GOLD_18K, RATE_CODE_USD } from '@repo/models';
import { CurrencyRateRepository } from '../currency-rate.repository';

interface BrsApiQuote {
  symbol: string;
  name_en?: string;
  price: number;
  unit: string;
}

interface BrsApiResponse {
  gold?: BrsApiQuote[];
  currency?: BrsApiQuote[];
  cryptocurrency?: unknown[];
}

type BrsApiSection = 'gold' | 'currency';

interface SyncedRate {
  code: string;
  section: BrsApiSection;
  symbol: string;
}

const SYNCED_RATES: SyncedRate[] = [
  { code: RATE_CODE_USD, section: 'currency', symbol: 'USD' },
  { code: RATE_CODE_GOLD_18K, section: 'gold', symbol: 'IR_GOLD_18K' },
];
const RIAL_PER_TOMAN = 10;
const SOURCE = 'brsapi.ir';
const BRSAPI_URL = 'https://Api.BrsApi.ir/Market/Gold_Currency.php';
const FETCH_TIMEOUT_MS = 10_000;

@Injectable()
export class CurrencyRateSyncService {
  private readonly logger = new Logger(CurrencyRateSyncService.name);

  constructor(
    private readonly currencyRateRepository: CurrencyRateRepository,
    private readonly configService: ConfigService,
  ) {}

  async syncAll(): Promise<void> {
    let data: BrsApiResponse;
    try {
      data = await this.fetchMarket();
    } catch (error) {
      this.logger.error(
        'Failed to fetch brsapi.ir market data, keeping last known values',
        error instanceof Error ? error.stack : String(error),
      );
      return;
    }

    for (const rate of SYNCED_RATES) {
      try {
        const toman = this.extractTomanRate(data, rate);
        await this.currencyRateRepository.upsert(rate.code, {
          rate: toman,
          source: SOURCE,
        });
      } catch (error) {
        this.logger.error(
          `Failed to sync rate for ${rate.code}, keeping last known value`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }
  }

  private async fetchMarket(): Promise<BrsApiResponse> {
    // Free tier requires a (free) key; a paid/Pro tier would only swap the URL/params below.
    const key = this.configService.get<string>('BRSAPI_KEY');
    if (!key) {
      throw new Error('BRSAPI_KEY is not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${BRSAPI_URL}?key=${encodeURIComponent(key)}`, {
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(`brsapi.ir responded with ${response.status}`);
    }

    return (await response.json()) as BrsApiResponse;
  }

  private extractTomanRate(data: BrsApiResponse, rate: SyncedRate): number {
    const section = data[rate.section];
    if (!Array.isArray(section)) {
      throw new Error(`brsapi.ir response missing ${rate.section} array`);
    }

    const entry = section.find(
      (item) => item.symbol?.toUpperCase() === rate.symbol.toUpperCase(),
    );
    if (!entry) {
      throw new Error(`brsapi.ir response missing ${rate.symbol} entry`);
    }

    if (typeof entry.price !== 'number' || !Number.isFinite(entry.price)) {
      throw new Error(
        `brsapi.ir returned a non-numeric price for ${rate.symbol}`,
      );
    }

    const unit = entry.unit ?? '';
    let toman: number;
    if (unit.includes('ریال')) {
      toman = entry.price / RIAL_PER_TOMAN;
    } else if (unit.includes('تومان')) {
      toman = entry.price;
    } else {
      throw new Error(
        `brsapi.ir returned unexpected unit "${entry.unit}" for ${rate.symbol}`,
      );
    }

    // Temporary: log every sync so the rate can be sanity-checked against a
    // free-market reference (tgju.org). Dial back to logger.debug once verified.
    this.logger.log(
      `brsapi.ir ${rate.code}: ${toman} Toman (raw ${entry.price} ${entry.unit})`,
    );

    return toman;
  }
}
