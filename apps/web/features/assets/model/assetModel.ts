import { AssetModel, rateCodeForCategory } from "@repo/models";
import {
  formatJalaliDate,
  formatToman,
  getNumberFormatter,
} from "@/shared/lib/format";
import { AssetCategoryLabel } from "@/features/assets/model/assetConstant";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export class AssetItemModel extends AssetModel {
  get formatValue(): string {
    return `${formatToman(this.value)} تومان`;
  }

  get formatQuantity(): string {
    return this.quantity === undefined
      ? "—"
      : getNumberFormatter().format(this.quantity);
  }

  get isDynamic(): boolean {
    return rateCodeForCategory(this.category) !== null;
  }

  get formatAcquisitionDate(): string {
    return this.acquisitionDate ? formatJalaliDate(this.acquisitionDate) : "—";
  }

  get categoryLabel(): string {
    return AssetCategoryLabel[this.category];
  }

  private resolveRate(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): number | null {
    const code = rateCodeForCategory(this.category);
    if (!code || this.quantity === undefined) return null;
    const rate = ratesByCode.get(code)?.rate;
    return rate === undefined ? null : rate;
  }

  currentValue(ratesByCode: Map<string, CurrencyRateItemModel>): number | null {
    const rate = this.resolveRate(ratesByCode);
    if (rate === null) return null;
    return this.valuationHandler.currentValue(rate);
  }

  profitAmount(ratesByCode: Map<string, CurrencyRateItemModel>): number | null {
    const rate = this.resolveRate(ratesByCode);
    if (rate === null) return null;
    return this.valuationHandler.profitAmount(rate);
  }

  profitPercentage(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): number | null {
    const rate = this.resolveRate(ratesByCode);
    if (rate === null) return null;
    return this.valuationHandler.profitPercentage(rate);
  }

  isProfit(ratesByCode: Map<string, CurrencyRateItemModel>): boolean | null {
    const rate = this.resolveRate(ratesByCode);
    if (rate === null) return null;
    return this.valuationHandler.isProfit(rate);
  }

  formatCurrentValue(ratesByCode: Map<string, CurrencyRateItemModel>): string {
    const value = this.currentValue(ratesByCode);
    return value === null ? "—" : `${formatToman(Math.round(value))} تومان`;
  }

  formatProfitAmount(ratesByCode: Map<string, CurrencyRateItemModel>): string {
    const value = this.profitAmount(ratesByCode);
    return value === null ? "—" : `${formatToman(Math.round(value))} تومان`;
  }

  formatProfitPercentage(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): string {
    const value = this.profitPercentage(ratesByCode);
    return value === null ? "—" : `${getNumberFormatter().format(value)}٪`;
  }

  static fromAssetModel(asset: AssetModel): AssetItemModel {
    const assetItem = new AssetItemModel();

    assetItem.id = asset.id;
    assetItem.name = asset.name;
    assetItem.category = asset.category;
    assetItem.value = asset.value;
    assetItem.acquisitionDate = asset.acquisitionDate;
    assetItem.location = asset.location;
    assetItem.notes = asset.notes;
    assetItem.quantity = asset.quantity;
    assetItem.createdAt = asset.createdAt;
    assetItem.updatedAt = asset.updatedAt;

    return assetItem;
  }
}
