import { CashFlowModel } from "./cashFlowModel";
import { CategoryBreakdownItemModel } from "./categoryBreakdownItemModel";
import { MonthlyTrendItemModel } from "./monthlyTrendItemModel";
import { NetWorthModel } from "./netWorthModel";

export class OverviewSummaryModel {
  netWorth!: NetWorthModel;
  cashFlow!: CashFlowModel;
  monthlyTrend!: MonthlyTrendItemModel[];
  expenseByCategory!: CategoryBreakdownItemModel[];
  incomeByCategory!: CategoryBreakdownItemModel[];
  investmentByCategory!: CategoryBreakdownItemModel[];
  assetByCategory!: CategoryBreakdownItemModel[];
  debtByCategory!: CategoryBreakdownItemModel[];
}
