import { CurrencyRateModel } from "@repo/models";
import { formatJalaliDate, formatToman } from "@/shared/lib/format";

export class CurrencyRateItemModel extends CurrencyRateModel {
  get formatRate(): string {
    return `${formatToman(this.rate)} تومان`;
  }

  get formatUpdatedAt(): string {
    return formatJalaliDate(new Date(this.updatedAt).getTime());
  }

  static fromCurrencyRateModel(
    currencyRate: CurrencyRateModel,
  ): CurrencyRateItemModel {
    const currencyRateItem = new CurrencyRateItemModel();

    currencyRateItem.id = currencyRate.id;
    currencyRateItem.code = currencyRate.code;
    currencyRateItem.rate = currencyRate.rate;
    currencyRateItem.source = currencyRate.source;
    currencyRateItem.updatedAt = currencyRate.updatedAt;

    return currencyRateItem;
  }
}
