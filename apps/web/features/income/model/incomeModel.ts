import { IncomeModel } from "@repo/models";
import { formatJalaliDate, formatToman, formatUsd } from "@/shared/lib/format";
import {
  IncomeCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/income/model/incomeConstant";

export class IncomeItemModel extends IncomeModel {
  get formatPrice(): string {
    return `${formatToman(this.price)} تومان`;
  }

  get formatDate(): string {
    return formatJalaliDate(this.date);
  }

  get categoryLabel(): string {
    return IncomeCategoryLabel[this.category];
  }

  get recurrenceRuleLabel(): string {
    return this.recurrenceRule ? RecurrenceRuleLabel[this.recurrenceRule] : "—";
  }

  formatPriceUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.price / tomanPerUsdRate) : "—";
  }

  static fromIncomeModel(income: IncomeModel): IncomeItemModel {
    const incomeItem = new IncomeItemModel();

    incomeItem.id = income.id;
    incomeItem.name = income.name;
    incomeItem.price = income.price;
    incomeItem.source = income.source;
    incomeItem.date = income.date;
    incomeItem.isRecurring = income.isRecurring;
    incomeItem.recurrenceRule = income.recurrenceRule;
    incomeItem.category = income.category;
    incomeItem.notes = income.notes;
    incomeItem.createdAt = income.createdAt;
    incomeItem.updatedAt = income.updatedAt;

    return incomeItem;
  }
}
