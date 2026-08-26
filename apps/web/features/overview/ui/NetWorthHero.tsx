import type { NetWorthModel } from "@repo/models";
import { BarChart3, HandCoins, PiggyBank } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import { formatToman } from "@/shared/lib/format";

const stats = [
  { key: "totalAssets" as const, label: "دارایی‌ها", icon: PiggyBank },
  {
    key: "totalInvestments" as const,
    label: "سرمایه‌گذاری‌ها",
    icon: BarChart3,
  },
  { key: "totalDebt" as const, label: "بدهی‌ها", icon: HandCoins },
];

export function NetWorthHero({ netWorth }: { netWorth: NetWorthModel }) {
  return (
    <Card className="overflow-hidden border-primary/15 bg-primary text-primary-foreground shadow-sm">
      <CardHeader className="min-h-36 justify-between gap-6 p-6 md:p-8">
        <div className="grid gap-1.5">
          <CardDescription className="text-primary-foreground/70">
            ارزش خالص دارایی
          </CardDescription>
          <CardTitle className="text-3xl leading-tight md:text-4xl">
            {formatToman(netWorth.netWorth)} تومان
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 p-6 pt-0 sm:grid-cols-3 md:px-8">
        {stats.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3"
          >
            <Icon className="size-4 shrink-0 text-primary-foreground/70" />
            <div className="grid gap-0.5">
              <span className="text-xs text-primary-foreground/70">
                {label}
              </span>
              <span className="text-sm font-semibold">
                {formatToman(netWorth[key])} تومان
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
