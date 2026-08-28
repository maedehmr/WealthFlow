import type { UpdateCurrencyRateRequestModel } from "@repo/models";
import { currencyRateApi } from "@/features/currencyRates/api/currencyRateApi";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export class CurrencyRateService {
  list(): Promise<CurrencyRateItemModel[]> {
    return currencyRateApi.list();
  }

  update(
    code: string,
    data: UpdateCurrencyRateRequestModel,
  ): Promise<CurrencyRateItemModel> {
    return currencyRateApi.update(code, data);
  }
}

export const currencyRateService = new CurrencyRateService();
