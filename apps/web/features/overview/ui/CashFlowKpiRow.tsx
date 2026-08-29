import type { CashFlowModel } from "@repo/models";
import {
  BanknoteArrowUp,
  CreditCard,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import { Badge } from "@/shared/components/Badge";
import { formatToman } from "@/shared/lib/format";

export function CashFlowKpiRow({ cashFlow }: { cashFlow: CashFlowModel }) {
  const isPositive = cashFlow.savings >= 0;

  const cards = [
    {
      title: "درآمد این ماه",
      value: `${formatToman(cashFlow.monthIncome)} تومان`,
      icon: BanknoteArrowUp,
      badge: null,
    },
    {
      title: "هزینه این ماه",
      value: `${formatToman(cashFlow.monthExpense)} تومان`,
      icon: CreditCard,
      badge: null,
    },
    {
      title: "پس‌انداز این ماه",
      value: `${formatToman(cashFlow.savings)} تومان`,
      icon: isPositive ? TrendingUp : TrendingDown,
      badge: isPositive ? "مثبت" : "منفی",
    },
    {
      title: "نرخ پس‌انداز",
      value: `${formatToman(Math.round(cashFlow.savingsRate))}٪`,
      icon: Percent,
      badge: null,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((item) => (
        <Card key={item.title} className="justify-between shadow-xs">
          <CardHeader className="flex-row items-start justify-between gap-4 pb-2">
            <div className="grid gap-1.5">
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl leading-8">
                {item.value}
              </CardTitle>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
              <item.icon className="size-5 text-chart-3" />
            </div>
          </CardHeader>
          {item.badge && (
            <CardContent className="flex items-center justify-end gap-3 pt-0">
              <Badge
                variant="secondary"
                className={isPositive ? "text-chart-3" : "text-destructive"}
              >
                {item.badge}
              </Badge>
            </CardContent>
          )}
        </Card>
      ))}
    </section>
  );
}
