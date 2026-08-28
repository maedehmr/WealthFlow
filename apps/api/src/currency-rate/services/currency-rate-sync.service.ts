import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyRateRepository } from '../currency-rate.repository';

interface BrsApiCurrency {
  symbol: string;
  name_en?: string;
  price: number;
  unit: string;
}

interface BrsApiResponse {
  gold?: unknown[];
  currency?: BrsApiCurrency[];
  cryptocurrency?: unknown[];
}

const SYNCED_CODES = ['USD', 'EUR'] as const;
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
    for (const code of SYNCED_CODES) {
      try {
        const rate = await this.fetchTomanRate(code);
        await this.currencyRateRepository.upsert(code, {
          rate,
          source: SOURCE,
        });
      } catch (error) {
        this.logger.error(
          `Failed to sync currency rate for ${code}, keeping last known value`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }
  }

  private async fetchTomanRate(code: string): Promise<number> {
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

    const data = (await response.json()) as BrsApiResponse;
    if (!Array.isArray(data.currency)) {
      throw new Error('brsapi.ir response missing currency array');
    }

    const entry = data.currency.find(
      (item) => item.symbol?.toUpperCase() === code,
    );
    if (!entry) {
      throw new Error(`brsapi.ir response missing ${code} entry`);
    }

    if (typeof entry.price !== 'number' || !Number.isFinite(entry.price)) {
      throw new Error(`brsapi.ir returned a non-numeric price for ${code}`);
    }

    const unit = entry.unit ?? '';
    let toman: number;
    if (unit.includes('ریال')) {
      toman = entry.price / RIAL_PER_TOMAN;
    } else if (unit.includes('تومان')) {
      toman = entry.price;
    } else {
      throw new Error(
        `brsapi.ir returned unexpected unit "${entry.unit}" for ${code}`,
      );
    }

    // Temporary: log every sync so the rate can be sanity-checked against a
    // free-market reference (tgju.org). Dial back to logger.debug once verified.
    this.logger.log(
      `brsapi.ir ${code}: ${toman} Toman (raw ${entry.price} ${entry.unit})`,
    );

    return toman;
  }
}
