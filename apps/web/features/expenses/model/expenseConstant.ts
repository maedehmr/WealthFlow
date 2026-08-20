import { ExpenseCategory, PaymentMethod, RecurrenceRule } from "@repo/models";

export const ExpenseCategoryLabel: Record<ExpenseCategory, string> = {
  [ExpenseCategory.Food]: "خوراک",
  [ExpenseCategory.Transport]: "حمل‌ونقل",
  [ExpenseCategory.Housing]: "مسکن",
  [ExpenseCategory.Utilities]: "قبوض",
  [ExpenseCategory.Entertainment]: "سرگرمی",
  [ExpenseCategory.Health]: "سلامت",
  [ExpenseCategory.Other]: "سایر",
};

export const PaymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]: "نقدی",
  [PaymentMethod.DebitCard]: "کارت بانکی",
  [PaymentMethod.CreditCard]: "کارت اعتباری",
  [PaymentMethod.BankTransfer]: "انتقال بانکی",
  [PaymentMethod.Other]: "سایر",
};

export const RecurrenceRuleLabel: Record<RecurrenceRule, string> = {
  [RecurrenceRule.Daily]: "روزانه",
  [RecurrenceRule.Weekly]: "هفتگی",
  [RecurrenceRule.Monthly]: "ماهانه",
  [RecurrenceRule.Yearly]: "سالانه",
};

export enum ExpenseQueryKey {
  Expenses = "expenses",
}
