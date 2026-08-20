"use client";

import { Plus } from "lucide-react";
import { BaseTable } from "@/shared/components/BaseTable";
import { Button } from "@/shared/components/Button";
import { useExpenseTable } from "@/features/expenses/hooks/useExpenseTable";
import { useExpenseStore } from "@/features/expenses/model/expenseStore";
import { DeleteExpenseDialog } from "@/features/expenses/ui/DeleteExpenseDialog";
import { ExpenseFormDialog } from "@/features/expenses/ui/ExpenseFormDialog";

export function ExpensesTable() {
  const { columns, rows, rowKey, actions, isLoading, errorMessage } =
    useExpenseTable();
  const openCreateDialog = useExpenseStore((state) => state.openCreateDialog);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">هزینه‌ها</h1>
        <Button onClick={openCreateDialog}>
          <Plus />
          ایجاد
        </Button>
      </div>
      {errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
      <BaseTable
        columns={columns}
        rows={rows}
        rowKey={rowKey}
        isLoading={isLoading}
        emptyState="هنوز هزینه‌ای ثبت نشده است"
        actions={actions}
      />
      <ExpenseFormDialog />
      <DeleteExpenseDialog />
    </div>
  );
}
