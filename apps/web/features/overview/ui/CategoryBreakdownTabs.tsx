import type { CategoryBreakdownItemModel } from "@repo/models";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/shared/components/Tabs";
import { AssetCategoryLabel } from "@/features/assets/model/assetConstant";
import { DebtCategoryLabel } from "@/features/debts/model/debtConstant";
import { ExpenseCategoryLabel } from "@/features/expenses/model/expenseConstant";
import { IncomeCategoryLabel } from "@/features/income/model/incomeConstant";
import { InvestmentCategoryLabel } from "@/features/investments/model/investmentConstant";
import { CategoryProgressList } from "@/features/overview/ui/CategoryProgressList";
import { CategoryDonutChart } from "@/features/overview/ui/CategoryDonutChart";

interface CategoryBreakdownTabsProps {
  expense: CategoryBreakdownItemModel[];
  income: CategoryBreakdownItemModel[];
  investment: CategoryBreakdownItemModel[];
  asset: CategoryBreakdownItemModel[];
  debt: CategoryBreakdownItemModel[];
}

export function CategoryBreakdownTabs({
  expense,
  income,
  investment,
  asset,
  debt,
}: CategoryBreakdownTabsProps) {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>دسته‌بندی‌ها</CardTitle>
        <CardDescription>ترکیب هر بخش از دارایی و تراکنش‌های شما</CardDescription>
      </CardHeader>
      <Tabs defaultValue="expense" className="px-6 pb-6">
        <TabsList>
          <TabsTab value="expense">هزینه‌ها</TabsTab>
          <TabsTab value="income">درآمد</TabsTab>
          <TabsTab value="investment">سرمایه‌گذاری</TabsTab>
          <TabsTab value="asset">دارایی‌ها</TabsTab>
          <TabsTab value="debt">بدهی</TabsTab>
        </TabsList>
        <TabsPanel value="expense">
          <CategoryProgressList
            items={expense}
            labels={ExpenseCategoryLabel}
            emptyMessage="هنوز هزینه‌ای ثبت نشده است"
          />
        </TabsPanel>
        <TabsPanel value="income">
          <CategoryProgressList
            items={income}
            labels={IncomeCategoryLabel}
            emptyMessage="هنوز درآمدی ثبت نشده است"
          />
        </TabsPanel>
        <TabsPanel value="investment">
          <CategoryDonutChart
            items={investment}
            labels={InvestmentCategoryLabel}
            emptyMessage="هنوز سرمایه‌گذاری‌ای ثبت نشده است"
          />
        </TabsPanel>
        <TabsPanel value="asset">
          <CategoryDonutChart
            items={asset}
            labels={AssetCategoryLabel}
            emptyMessage="هنوز دارایی‌ای ثبت نشده است"
          />
        </TabsPanel>
        <TabsPanel value="debt">
          <CategoryProgressList
            items={debt}
            labels={DebtCategoryLabel}
            emptyMessage="هنوز بدهی‌ای ثبت نشده است"
          />
        </TabsPanel>
      </Tabs>
    </Card>
  );
}
