import { Injectable, NotFoundException } from '@nestjs/common';
import { CurrencyRateModel } from '@repo/models';
import { UpdateCurrencyRateDto } from './dto/update-currency-rate.dto';
import { CurrencyRateMapper } from './mappers/currency-rate.mapper';
import { CurrencyRateRepository } from './currency-rate.repository';

@Injectable()
export class CurrencyRateService {
  constructor(
    private readonly currencyRateRepository: CurrencyRateRepository,
  ) {}

  async findAll(): Promise<CurrencyRateModel[]> {
    const rates = await this.currencyRateRepository.findAll();
    return rates.map((rate) => CurrencyRateMapper.toDomain(rate));
  }

  async updateByCode(
    code: string,
    dto: UpdateCurrencyRateDto,
  ): Promise<CurrencyRateModel> {
    const rate = await this.currencyRateRepository.upsert(code, dto);
    if (!rate) {
      throw new NotFoundException('Currency rate not found');
    }
    return CurrencyRateMapper.toDomain(rate);
  }
}
