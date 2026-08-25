"use client";

import { Plus } from "lucide-react";
import { BaseTable } from "@/shared/components/BaseTable";
import { Button } from "@/shared/components/Button";
import { useDebtTable } from "@/features/debts/hooks/useDebtTable";
import { useDebtStore } from "@/features/debts/model/debtStore";
import { DeleteDebtDialog } from "@/features/debts/ui/DeleteDebtDialog";
import { DebtFormDialog } from "@/features/debts/ui/DebtFormDialog";

export function DebtsTable() {
  const { columns, rows, rowKey, actions, isLoading, errorMessage } =
    useDebtTable();
  const openCreateDialog = useDebtStore((state) => state.openCreateDialog);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">بدهی‌ها</h1>
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
        emptyState="هنوز بدهی ثبت نشده است"
        actions={actions}
      />
      <DebtFormDialog />
      <DeleteDebtDialog />
    </div>
  );
}
