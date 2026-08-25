import { InvestmentCategory, RecurrenceRule } from "@repo/models";

export const InvestmentCategoryLabel: Record<InvestmentCategory, string> = {
  [InvestmentCategory.Stocks]: "سهام",
  [InvestmentCategory.Crypto]: "ارز دیجیتال",
  [InvestmentCategory.RealEstate]: "املاک",
  [InvestmentCategory.Gold]: "طلا",
  [InvestmentCategory.Fund]: "صندوق",
  [InvestmentCategory.Bond]: "اوراق قرضه",
  [InvestmentCategory.Other]: "سایر",
};

export const RecurrenceRuleLabel: Record<RecurrenceRule, string> = {
  [RecurrenceRule.Daily]: "روزانه",
  [RecurrenceRule.Weekly]: "هفتگی",
  [RecurrenceRule.Monthly]: "ماهانه",
  [RecurrenceRule.Yearly]: "سالانه",
};

export enum InvestmentQueryKey {
  Investments = "investments",
}
