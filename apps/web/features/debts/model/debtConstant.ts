import { DebtCategory, RecurrenceRule } from "@repo/models";

export const DebtCategoryLabel: Record<DebtCategory, string> = {
  [DebtCategory.Loan]: "وام",
  [DebtCategory.CreditCard]: "کارت اعتباری",
  [DebtCategory.Mortgage]: "رهن و اجاره",
  [DebtCategory.StudentLoan]: "وام دانشجویی",
  [DebtCategory.Personal]: "شخصی",
  [DebtCategory.Other]: "سایر",
};

export const RecurrenceRuleLabel: Record<RecurrenceRule, string> = {
  [RecurrenceRule.Daily]: "روزانه",
  [RecurrenceRule.Weekly]: "هفتگی",
  [RecurrenceRule.Monthly]: "ماهانه",
  [RecurrenceRule.Yearly]: "سالانه",
};

export enum DebtQueryKey {
  Debts = "debts",
}
