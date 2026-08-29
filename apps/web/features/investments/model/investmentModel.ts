import { InvestmentModel, rateCodeForCategory } from "@repo/models";
import {
  formatJalaliDate,
  formatToman,
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

  get formatPurchaseDate(): string {
    return formatJalaliDate(this.purchaseDate);
  }

  get categoryLabel(): string {
    return InvestmentCategoryLabel[this.category];
  }

  get recurrenceRuleLabel(): string {
    return this.recurrenceRule ? RecurrenceRuleLabel[this.recurrenceRule] : "—";
  }

  private resolveRate(
    ratesByCode: Map<string, CurrencyRateItemModel>,
  ): number | null {
    const code = rateCodeForCategory(this.category);
    const rate = code ? ratesByCode.get(code)?.rate : undefined;
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
    investmentItem.quantity = investment.quantity;
    investmentItem.createdAt = investment.createdAt;
    investmentItem.updatedAt = investment.updatedAt;

    return investmentItem;
  }
}
