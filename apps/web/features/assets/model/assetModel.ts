import {
  AssetModel,
  HasCurrencyExposure,
  ManualValuationModel,
  ValuationMode,
} from "@repo/models";
import {
  formatJalaliDate,
  formatToman,
  formatUsd,
  getNumberFormatter,
} from "@/shared/lib/format";
import { AssetCategoryLabel } from "@/features/assets/model/assetConstant";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export class AssetItemModel extends AssetModel {
  get formatValue(): string {
    return `${formatToman(this.value)} تومان`;
  }

  get formatForeignAmount(): string {
    return this.foreignAmount === undefined
      ? "—"
      : getNumberFormatter().format(this.foreignAmount);
  }

  get isCurrencyExposed(): boolean {
    return this.valuationMode === ValuationMode.CurrencyExposed;
  }

  get formatAcquisitionDate(): string {
    return this.acquisitionDate ? formatJalaliDate(this.acquisitionDate) : "—";
  }

  get categoryLabel(): string {
    return AssetCategoryLabel[this.category];
  }

  formatValueUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.value / tomanPerUsdRate) : "—";
  }

  get isManual(): boolean {
    return this.valuationMode === ValuationMode.Manual;
  }

  private resolveRateInput(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): number | null {
    if (this.valuationMode === ValuationMode.CurrencyExposed) {
      const rate = this.currencyCode
        ? ratesByCode.get(this.currencyCode)?.rate
        : undefined;
      if (rate === undefined || this.foreignAmount === undefined) {
        return null;
      }
      return rate;
    }
    return null;
  }

  currentValue(ratesByCode: Map<string, CurrencyRateItemModel>): number | null {
    if (this.isManual) {
      return (this.valuationHandler as ManualValuationModel).currentValue;
    }
    const rateInput = this.resolveRateInput(ratesByCode);
    if (rateInput === null) return null;
    return (this.valuationHandler as HasCurrencyExposure<number>).currentValue(
      rateInput,
    );
  }

  profitAmount(ratesByCode: Map<string, CurrencyRateItemModel>): number | null {
    if (this.isManual) {
      return (this.valuationHandler as ManualValuationModel).profitAmount;
    }
    const rateInput = this.resolveRateInput(ratesByCode);
    if (rateInput === null) return null;
    return (this.valuationHandler as HasCurrencyExposure<number>).profitAmount(
      rateInput,
    );
  }

  profitPercentage(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): number | null {
    if (this.isManual) return null;
    const rateInput = this.resolveRateInput(ratesByCode);
    if (rateInput === null) return null;
    return (
      this.valuationHandler as HasCurrencyExposure<number>
    ).profitPercentage(rateInput);
  }

  isProfit(ratesByCode: Map<string, CurrencyRateItemModel>): boolean | null {
    if (this.isManual) {
      return (this.valuationHandler as ManualValuationModel).isProfit;
    }
    const rateInput = this.resolveRateInput(ratesByCode);
    if (rateInput === null) return null;
    return (this.valuationHandler as HasCurrencyExposure<number>).isProfit(
      rateInput,
    );
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
    assetItem.valuationMode = asset.valuationMode;
    assetItem.currencyCode = asset.currencyCode;
    assetItem.foreignAmount = asset.foreignAmount;
    assetItem.latestManualValue = asset.latestManualValue;
    assetItem.manualValueUpdatedAt = asset.manualValueUpdatedAt;
    assetItem.createdAt = asset.createdAt;
    assetItem.updatedAt = asset.updatedAt;

    return assetItem;
  }
}
