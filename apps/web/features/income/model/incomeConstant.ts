import { IncomeCategory } from "@repo/models";

export const IncomeCategoryLabel: Record<IncomeCategory, string> = {
  [IncomeCategory.Salary]: "حقوق",
  [IncomeCategory.Freelance]: "فریلنس",
  [IncomeCategory.Other]: "سایر",
};

export enum IncomeQueryKey {
  Incomes = "incomes",
}

