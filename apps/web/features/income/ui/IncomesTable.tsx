"use client";

import { Plus } from "lucide-react";
import { BaseTable } from "@/shared/components/BaseTable";
import { Button } from "@/shared/components/Button";
import { useIncomeTable } from "@/features/income/hooks/useIncomeTable";
import { useIncomeStore } from "@/features/income/model/incomeStore";
import { DeleteIncomeDialog } from "@/features/income/ui/DeleteIncomeDialog";
import { IncomeFormDialog } from "@/features/income/ui/IncomeFormDialog";

export function IncomesTable() {
  const { columns, rows, rowKey, actions, isLoading, errorMessage } =
    useIncomeTable();
  const openCreateDialog = useIncomeStore((state) => state.openCreateDialog);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">درآمد</h1>
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
        emptyState="هنوز درآمدی ثبت نشده است"
        actions={actions}
      />
      <IncomeFormDialog />
      <DeleteIncomeDialog />
    </div>
  );
}
