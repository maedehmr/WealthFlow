import { DebtModel } from "@repo/models";
import { formatJalaliDate, formatToman, formatUsd } from "@/shared/lib/format";
import {
  DebtCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/debts/model/debtConstant";

export class DebtItemModel extends DebtModel {
  get formatPrice(): string {
    return `${formatToman(this.price)} تومان`;
  }

  get formatDate(): string {
    return formatJalaliDate(this.date);
  }

  get categoryLabel(): string {
    return DebtCategoryLabel[this.category];
  }

  get recurrenceRuleLabel(): string {
    return this.recurrenceRule ? RecurrenceRuleLabel[this.recurrenceRule] : "—";
  }

  formatPriceUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.price / tomanPerUsdRate) : "—";
  }

  static fromDebtModel(debt: DebtModel): DebtItemModel {
    const debtItem = new DebtItemModel();

    debtItem.id = debt.id;
    debtItem.name = debt.name;
    debtItem.price = debt.price;
    debtItem.category = debt.category;
    debtItem.date = debt.date;
    debtItem.isRecurring = debt.isRecurring;
    debtItem.recurrenceRule = debt.recurrenceRule;
    debtItem.creditor = debt.creditor;
    debtItem.notes = debt.notes;
    debtItem.createdAt = debt.createdAt;
    debtItem.updatedAt = debt.updatedAt;

    return debtItem;
  }
}
