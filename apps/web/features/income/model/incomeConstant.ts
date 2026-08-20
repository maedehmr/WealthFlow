import { IncomeCategory, RecurrenceRule } from "@repo/models";

export const IncomeCategoryLabel: Record<IncomeCategory, string> = {
  [IncomeCategory.Salary]: "حقوق",
  [IncomeCategory.Freelance]: "فریلنس",
  [IncomeCategory.Other]: "سایر",
};

export const RecurrenceRuleLabel: Record<RecurrenceRule, string> = {
  [RecurrenceRule.Daily]: "روزانه",
  [RecurrenceRule.Weekly]: "هفتگی",
  [RecurrenceRule.Monthly]: "ماهانه",
  [RecurrenceRule.Yearly]: "سالانه",
};

export enum IncomeQueryKey {
  Incomes = "incomes",
}

