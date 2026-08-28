import {
  HasCurrencyExposure,
  InvestmentModel,
  ManualValuationModel,
  ValuationMode,
} from "@repo/models";
import {
  formatJalaliDate,
  formatToman,
  formatUsd,
  getNumberFormatter,
} from "@/shared/lib/format";
import {
  InvestmentCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/investments/model/investmentConstant";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export class InvestmentItemModel extends InvestmentModel {
  get formatPrice(): string {
    return `${formatToman(this.price)} تومان`;
  }

  get formatQuantity(): string {
    return getNumberFormatter().format(this.quantity);
  }

  get formatForeignAmount(): string {
    return this.foreignAmount === undefined
      ? "—"
      : getNumberFormatter().format(this.foreignAmount);
  }

  get isCurrencyExposed(): boolean {
    return this.valuationMode === ValuationMode.CurrencyExposed;
  }

  get formatPurchaseDate(): string {
    return formatJalaliDate(this.purchaseDate);
  }

  get categoryLabel(): string {
    return InvestmentCategoryLabel[this.category];
  }

  get recurrenceRuleLabel(): string {
    return this.recurrenceRule ? RecurrenceRuleLabel[this.recurrenceRule] : "—";
  }

  formatPriceUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.price / tomanPerUsdRate) : "—";
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

  static fromInvestmentModel(investment: InvestmentModel): InvestmentItemModel {
    const investmentItem = new InvestmentItemModel();

    investmentItem.id = investment.id;
    investmentItem.name = investment.name;
    investmentItem.category = investment.category;
    investmentItem.price = investment.price;
    investmentItem.purchaseDate = investment.purchaseDate;
    investmentItem.broker = investment.broker;
    investmentItem.isRecurring = investment.isRecurring;
    investmentItem.recurrenceRule = investment.recurrenceRule;
    investmentItem.notes = investment.notes;
    investmentItem.valuationMode = investment.valuationMode;
    investmentItem.quantity = investment.quantity;
    investmentItem.currencyCode = investment.currencyCode;
    investmentItem.foreignAmount = investment.foreignAmount;
    investmentItem.latestManualValue = investment.latestManualValue;
    investmentItem.manualValueUpdatedAt = investment.manualValueUpdatedAt;
    investmentItem.createdAt = investment.createdAt;
    investmentItem.updatedAt = investment.updatedAt;

    return investmentItem;
  }
}
