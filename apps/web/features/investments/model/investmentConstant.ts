import { InvestmentCategory, RecurrenceRule } from "@repo/models";

export const InvestmentCategoryLabel: Record<InvestmentCategory, string> = {
  [InvestmentCategory.Gold]: "طلا",
  [InvestmentCategory.Dollar]: "دلار",
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
