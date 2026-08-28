import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyRate } from './entities/currency-rate.entity';

@Injectable()
export class CurrencyRateRepository {
  constructor(
    @InjectRepository(CurrencyRate)
    private readonly repository: Repository<CurrencyRate>,
  ) {}

  findAll(): Promise<CurrencyRate[]> {
    return this.repository.find({ order: { code: 'ASC' } });
  }

  findByCode(code: string): Promise<CurrencyRate | null> {
    return this.repository.findOneBy({ code });
  }

  async upsert(
    code: string,
    data: { rate: number; source?: string | null },
  ): Promise<CurrencyRate> {
    const existing = await this.findByCode(code);
    if (existing) {
      return this.repository.save(
        this.repository.merge(existing, {
          rate: data.rate,
          source: data.source ?? existing.source,
        }),
      );
    }
    return this.repository.save(
      this.repository.create({
        code,
        rate: data.rate,
        source: data.source ?? null,
      }),
    );
  }
}
