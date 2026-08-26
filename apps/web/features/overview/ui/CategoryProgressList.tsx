import type { CategoryBreakdownItemModel } from "@repo/models";
import { Progress } from "@/shared/components/Progress";
import { formatToman } from "@/shared/lib/format";

export function CategoryProgressList({
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

  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <div key={item.category} className="grid gap-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">
              {labels[item.category] ?? item.category}
            </span>
            <span className="text-muted-foreground">
              {formatToman(item.total)} تومان
            </span>
          </div>
          <Progress value={item.percentage} />
        </div>
      ))}
    </div>
  );
}
