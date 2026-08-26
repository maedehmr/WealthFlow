import type { CategoryBreakdownItemModel } from "@repo/models";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/Chart";
import { formatToman } from "@/shared/lib/format";

const CHART_COLORS = [
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function CategoryDonutChart({
  items,
  labels,
  emptyMessage,
}: {
  items: CategoryBreakdownItemModel[];
  labels: Record<string, string>;
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const data = items.map((item, index) => ({
    category: item.category,
    label: labels[item.category] ?? item.category,
    total: item.total,
    percentage: item.percentage,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const config: ChartConfig = Object.fromEntries(
    data.map((item) => [item.category, { label: item.label, color: item.fill }]),
  );

  return (
    <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
      <ChartContainer config={config} className="mx-auto aspect-square h-44">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, _name, item) => (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      {item.payload.label}
                    </span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {formatToman(Number(value))} تومان
                    </span>
                  </div>
                )}
              />
            }
          />
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius={45}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="grid gap-2.5">
        {data.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.fill }}
              />
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-muted-foreground">
              {formatToman(item.total)} تومان ({formatToman(Math.round(item.percentage))}٪)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
