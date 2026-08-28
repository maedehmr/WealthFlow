import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CurrencyRateModel } from '@repo/models';
import { UpdateCurrencyRateDto } from './dto/update-currency-rate.dto';
import { CurrencyRateService } from './currency-rate.service';

@Controller('currency-rates')
export class CurrencyRateController {
  constructor(private readonly currencyRateService: CurrencyRateService) {}

  @Get()
  findAll(): Promise<CurrencyRateModel[]> {
    return this.currencyRateService.findAll();
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() dto: UpdateCurrencyRateDto,
  ): Promise<CurrencyRateModel> {
    return this.currencyRateService.updateByCode(code, dto);
  }
}
