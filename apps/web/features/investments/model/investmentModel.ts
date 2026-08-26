import { InvestmentModel } from "@repo/models";
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

  formatPriceUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.price / tomanPerUsdRate) : "—";
  }

  static fromInvestmentModel(investment: InvestmentModel): InvestmentItemModel {
    const investmentItem = new InvestmentItemModel();

    investmentItem.id = investment.id;
    investmentItem.name = investment.name;
    investmentItem.category = investment.category;
    investmentItem.price = investment.price;
    investmentItem.quantity = investment.quantity;
    investmentItem.purchaseDate = investment.purchaseDate;
    investmentItem.broker = investment.broker;
    investmentItem.isRecurring = investment.isRecurring;
    investmentItem.recurrenceRule = investment.recurrenceRule;
    investmentItem.notes = investment.notes;
    investmentItem.createdAt = investment.createdAt;
    investmentItem.updatedAt = investment.updatedAt;

    return investmentItem;
  }
}
