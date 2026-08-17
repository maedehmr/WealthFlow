import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface BaseTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

export interface BaseTableProps<T> {
  columns: BaseTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  actions?: (row: T) => React.ReactNode;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  className?: string;
}

function BaseTable<T>({
  columns,
  rows,
  rowKey,
  actions,
  isLoading,
  emptyState,
  loadingState,
  className,
}: BaseTableProps<T>) {
  const columnCount = columns.length + (actions ? 1 : 0);

  return (
    <div
      data-slot="table-container"
      className={cn("w-full overflow-x-auto rounded-lg border", className)}
    >
      <table data-slot="table" className="w-full caption-bottom text-sm">
        <thead data-slot="table-header" className="bg-muted/50 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-muted-foreground h-10 px-4 text-start align-middle font-medium",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="text-muted-foreground h-10 px-4 text-start align-middle font-medium">
                عملیات
              </th>
            )}
          </tr>
        </thead>
        <tbody data-slot="table-body">
          {isLoading ? (
            <tr>
              <td
                colSpan={columnCount}
                className="text-muted-foreground h-24 text-center"
              >
                {loadingState ?? "در حال بارگذاری..."}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columnCount}
                className="text-muted-foreground h-24 text-center"
              >
                {emptyState ?? "داده‌ای برای نمایش وجود ندارد"}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="hover:bg-muted/30 border-b last:border-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("p-4 align-middle", column.className)}
                  >
                    {column.cell
                      ? column.cell(row)
                      : String(
                          (row as Record<string, unknown>)[column.key] ?? ""
                        )}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 align-middle">{actions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { BaseTable };
