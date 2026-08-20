import { ExpenseModel } from "@repo/models";
import { formatJalaliDate, formatToman, formatUsd } from "@/shared/lib/format";
import {
  ExpenseCategoryLabel,
  PaymentMethodLabel,
  RecurrenceRuleLabel,
} from "@/features/expenses/model/expenseConstant";

export class ExpenseItemModel extends ExpenseModel {
  get formatPrice(): string {
    return `${formatToman(this.price)} تومان`;
  }

  get formatDate(): string {
    return formatJalaliDate(this.date);
  }

  get categoryLabel(): string {
    return ExpenseCategoryLabel[this.category];
  }

  get paymentMethodLabel(): string {
    return PaymentMethodLabel[this.paymentMethod];
  }

  get recurrenceRuleLabel(): string {
    return this.recurrenceRule ? RecurrenceRuleLabel[this.recurrenceRule] : "—";
  }

  formatPriceUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.price / tomanPerUsdRate) : "—";
  }

  static fromExpenseModel(expense: ExpenseModel): ExpenseItemModel {
    const expenseItem = new ExpenseItemModel();

    expenseItem.id = expense.id;
    expenseItem.name = expense.name;
    expenseItem.price = expense.price;
    expenseItem.category = expense.category;
    expenseItem.date = expense.date;
    expenseItem.isRecurring = expense.isRecurring;
    expenseItem.recurrenceRule = expense.recurrenceRule;
    expenseItem.paymentMethod = expense.paymentMethod;
    expenseItem.notes = expense.notes;
    expenseItem.createdAt = expense.createdAt;
    expenseItem.updatedAt = expense.updatedAt;

    return expenseItem;
  }
}
