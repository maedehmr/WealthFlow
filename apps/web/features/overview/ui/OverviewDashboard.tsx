"use client";

import { Card, CardContent } from "@/shared/components/Card";
import { useOverviewSummary } from "@/features/overview/hooks/useOverviewSummary";
import { NetWorthHero } from "@/features/overview/ui/NetWorthHero";
import { CashFlowKpiRow } from "@/features/overview/ui/CashFlowKpiRow";
import { TrendChartCard } from "@/features/overview/ui/TrendChartCard";
import { CategoryBreakdownTabs } from "@/features/overview/ui/CategoryBreakdownTabs";
import { OverviewSkeleton } from "@/features/overview/ui/OverviewSkeleton";

export function OverviewDashboard() {
  const { data, isLoading, errorMessage } = useOverviewSummary();

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (errorMessage || !data) {
    return (
      <Card className="shadow-xs">
        <CardContent className="py-10 text-center text-sm text-destructive">
          {errorMessage ?? "خطایی در دریافت اطلاعات رخ داد."}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <NetWorthHero netWorth={data.netWorth} />
      <CashFlowKpiRow cashFlow={data.cashFlow} />
      <TrendChartCard trend={data.monthlyTrend} />
      <CategoryBreakdownTabs
        expense={data.expenseByCategory}
        income={data.incomeByCategory}
        investment={data.investmentByCategory}
        asset={data.assetByCategory}
        debt={data.debtByCategory}
      />
    </div>
  );
}
