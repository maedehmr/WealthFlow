import { Injectable } from '@nestjs/common';
import {
  CategoryBreakdownItemModel,
  MonthlyTrendItemModel,
  OverviewSummaryModel,
} from '@repo/models';
import {
  OverviewRepository,
  RawCategoryBreakdown,
  RawMonthlyBucket,
} from './overview.repository';

const MONTHS_BACK = 6;

function toBreakdown(
  rows: RawCategoryBreakdown[],
): CategoryBreakdownItemModel[] {
  const total = rows.reduce((sum, row) => sum + Number(row.total), 0);
  return rows.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: total > 0 ? (Number(row.total) / total) * 100 : 0,
  }));
}

function monthKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-01`;
}

@Injectable()
export class OverviewService {
  constructor(private readonly overviewRepository: OverviewRepository) {}

  async getSummary(): Promise<OverviewSummaryModel> {
    const now = new Date();
    const monthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );
    const monthEnd = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );
    const trendSince = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (MONTHS_BACK - 1), 1),
    );

    const [
      totalAssets,
      totalInvestments,
      totalDebt,
      cashFlow,
      incomeTrend,
      expenseTrend,
      expenseByCategoryRaw,
      incomeByCategoryRaw,
      investmentByCategoryRaw,
      assetByCategoryRaw,
      debtByCategoryRaw,
    ] = await Promise.all([
      this.overviewRepository.getTotalAssetValue(),
      this.overviewRepository.getTotalInvestmentValue(),
      this.overviewRepository.getTotalDebtValue(),
      this.overviewRepository.getMonthCashFlow(monthStart, monthEnd),
      this.overviewRepository.getMonthlyIncomeTrend(trendSince),
      this.overviewRepository.getMonthlyExpenseTrend(trendSince),
      this.overviewRepository.getExpenseCategoryBreakdown(),
      this.overviewRepository.getIncomeCategoryBreakdown(),
      this.overviewRepository.getInvestmentCategoryBreakdown(),
      this.overviewRepository.getAssetCategoryBreakdown(),
      this.overviewRepository.getDebtCategoryBreakdown(),
    ]);

    const netWorth = totalAssets + totalInvestments - totalDebt;
    const savings = cashFlow.income - cashFlow.expense;

    return {
      netWorth: {
        totalAssets,
        totalInvestments,
        totalDebt,
        netWorth,
      },
      cashFlow: {
        monthIncome: cashFlow.income,
        monthExpense: cashFlow.expense,
        savings,
        savingsRate:
          cashFlow.income > 0 ? (savings / cashFlow.income) * 100 : 0,
      },
      monthlyTrend: buildMonthlyTrend(
        incomeTrend,
        expenseTrend,
        trendSince,
        MONTHS_BACK,
      ),
      expenseByCategory: toBreakdown(expenseByCategoryRaw),
      incomeByCategory: toBreakdown(incomeByCategoryRaw),
      investmentByCategory: toBreakdown(investmentByCategoryRaw),
      assetByCategory: toBreakdown(assetByCategoryRaw),
      debtByCategory: toBreakdown(debtByCategoryRaw),
    };
  }
}

function buildMonthlyTrend(
  incomeRows: RawMonthlyBucket[],
  expenseRows: RawMonthlyBucket[],
  since: Date,
  monthsBack: number,
): MonthlyTrendItemModel[] {
  const incomeByMonth = new Map(
    incomeRows.map((row) => [monthKey(new Date(row.month)), Number(row.total)]),
  );
  const expenseByMonth = new Map(
    expenseRows.map((row) => [
      monthKey(new Date(row.month)),
      Number(row.total),
    ]),
  );

  return Array.from({ length: monthsBack }, (_, index) => {
    const date = new Date(
      Date.UTC(since.getUTCFullYear(), since.getUTCMonth() + index, 1),
    );
    const key = monthKey(date);
    return {
      month: key,
      income: incomeByMonth.get(key) ?? 0,
      expense: expenseByMonth.get(key) ?? 0,
    };
  });
}
