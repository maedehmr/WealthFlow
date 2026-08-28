import type {
  CurrencyRateModel,
  UpdateCurrencyRateRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export interface CurrencyRateApi {
  list(): Promise<CurrencyRateItemModel[]>;
  update(
    code: string,
    data: UpdateCurrencyRateRequestModel,
  ): Promise<CurrencyRateItemModel>;
}

class HttpCurrencyRateApi implements CurrencyRateApi {
  async list(): Promise<CurrencyRateItemModel[]> {
    const { data } = await httpClient.get<CurrencyRateModel[]>(
      "/currency-rates",
    );
    return data.map(CurrencyRateItemModel.fromCurrencyRateModel);
  }

  async update(
    code: string,
    data: UpdateCurrencyRateRequestModel,
  ): Promise<CurrencyRateItemModel> {
    const { data: currencyRate } = await httpClient.patch<CurrencyRateModel>(
      `/currency-rates/${code}`,
      data,
    );
    return CurrencyRateItemModel.fromCurrencyRateModel(currencyRate);
  }
}

export const currencyRateApi: CurrencyRateApi = new HttpCurrencyRateApi();
