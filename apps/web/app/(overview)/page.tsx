import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/shared/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

const summaryCards = [
  {
    title: "درآمد",
    value: "۵,۰۰۰ دلار",
    change: "+۱۰٪",
    description: "نسبت به ماه قبل",
    icon: WalletCards,
  },
  {
    title: "هزینه‌ها",
    value: "۲,۰۰۰ دلار",
    change: "-۵٪",
    description: "کاهش هزینه ماهانه",
    icon: CreditCard,
  },
  {
    title: "سرمایه‌گذاری",
    value: "۱,۵۰۰ دلار",
    change: "+۱۵٪",
    description: "رشد دارایی ها",
    icon: BarChart3,
  },
];

const expenses = [
  { title: "خوراک", value: "۵۰۰ دلار", progress: "56%" },
  { title: "اجاره", value: "۹۰۰ دلار", progress: "100%" },
  { title: "حمل و نقل", value: "۲۰۰ دلار", progress: "28%" },
];

const investments = [
  { title: "سهام", value: "۸۰۰ دلار" },
  { title: "کریپتو", value: "۴۰۰ دلار" },
  { title: "طلا", value: "۳۰۰ دلار" },
];

export default function OverviewPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:gap-6">
      <Card className="overflow-hidden border-primary/15 bg-primary text-primary-foreground shadow-sm">
        <CardHeader className="min-h-36 justify-between gap-6 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="grid gap-1.5">
              <CardDescription className="text-primary-foreground/70">
                نمای کلی مالی
              </CardDescription>
              <CardTitle className="text-3xl leading-tight md:text-4xl">
                گزارش مرداد ۱۴۰۵
              </CardTitle>
            </div>
            <Badge className="w-fit border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-primary-foreground shadow-none">
              مرداد ۱۴۰۵
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((item) => (
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
            <CardContent className="flex items-center justify-between gap-3 pt-0">
              <span className="text-sm text-muted-foreground">
                {item.description}
              </span>
              <Badge variant="secondary" className="text-chart-3">
                {item.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <Card className="shadow-xs lg:col-span-3">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardDescription>درآمد منهای هزینه‌ها</CardDescription>
              <CardTitle className="mt-1">مانده</CardTitle>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
              <TrendingUp className="size-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid min-h-52 gap-6 rounded-lg border bg-muted/30 p-5 md:grid-cols-[1fr_180px] md:items-end">
              <div className="grid content-between gap-8">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="size-4" />
                    درآمد - هزینه‌ها
                  </div>
                  <p className="text-4xl font-semibold tracking-normal md:text-5xl">
                    ۳,۰۰۰ دلار
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="text-muted-foreground">درآمد</p>
                    <p className="mt-1 font-semibold">۵,۰۰۰ دلار</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="text-muted-foreground">هزینه‌ها</p>
                    <p className="mt-1 font-semibold">۲,۰۰۰ دلار</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-2 rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground md:justify-center">
                <ArrowUpRight className="size-4 text-chart-3" />
                جریان نقدی مثبت
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs lg:col-span-2">
          <CardHeader>
            <CardTitle>جزئیات هزینه‌ها</CardTitle>
            <CardDescription>بیشترین دسته های هزینه در مرداد</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {expenses.map((expense) => (
              <div key={expense.title} className="grid gap-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{expense.title}</span>
                  <span className="text-muted-foreground">
                    {expense.value}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-3"
                    style={{ width: expense.progress }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>خلاصه سرمایه‌گذاری</CardTitle>
          <CardDescription>ترکیب دارایی های سرمایه‌گذاری</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {investments.map((investment) => (
            <div
              key={investment.title}
              className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-4 text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                  <ArrowDownRight className="size-4 text-chart-3" />
                </div>
                <span className="font-medium">{investment.title}</span>
              </div>
              <span className="font-medium text-muted-foreground">
                {investment.value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
