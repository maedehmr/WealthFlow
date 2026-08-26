import type { MonthlyTrendItemModel } from "@repo/models";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/Chart";
import { formatJalaliMonth, formatToman } from "@/shared/lib/format";

const chartConfig: ChartConfig = {
  income: { label: "درآمد", color: "var(--chart-2)" },
  expense: { label: "هزینه‌ها", color: "var(--chart-4)" },
};

export function TrendChartCard({
  trend,
}: {
  trend: MonthlyTrendItemModel[];
}) {
  const data = trend.map((item) => ({
    month: formatJalaliMonth(new Date(item.month).getTime()),
    income: item.income,
    expense: item.expense,
  }));

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardDescription>روند ۶ ماه اخیر</CardDescription>
          <CardTitle className="mt-1">درآمد در برابر هزینه‌ها</CardTitle>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
          <TrendingUp className="size-5 text-chart-3" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart data={data} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {name === "income" ? "درآمد" : "هزینه‌ها"}
                      </span>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {formatToman(Number(value))} تومان
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="income"
              type="monotone"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={2}
            />
            <Area
              dataKey="expense"
              type="monotone"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
