import { CurrencyRateModel } from '@repo/models';
import { CurrencyRate } from '../entities/currency-rate.entity';

export class CurrencyRateMapper {
  static toDomain(entity: CurrencyRate): CurrencyRateModel {
    return {
      id: entity.id,
      code: entity.code,
      rate: entity.rate,
      source: entity.source ?? undefined,
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
