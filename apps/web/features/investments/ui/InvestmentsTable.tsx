"use client";

import { Plus } from "lucide-react";
import { BaseTable } from "@/shared/components/BaseTable";
import { Button } from "@/shared/components/Button";
import { useInvestmentTable } from "@/features/investments/hooks/useInvestmentTable";
import { useInvestmentStore } from "@/features/investments/model/investmentStore";
import { DeleteInvestmentDialog } from "@/features/investments/ui/DeleteInvestmentDialog";
import { InvestmentFormDialog } from "@/features/investments/ui/InvestmentFormDialog";

export function InvestmentsTable() {
  const { columns, rows, rowKey, actions, isLoading, errorMessage } =
    useInvestmentTable();
  const openCreateDialog = useInvestmentStore(
    (state) => state.openCreateDialog,
  );

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">سرمایه‌گذاری</h1>
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
        emptyState="هنوز سرمایه‌گذاری ثبت نشده است"
        actions={actions}
      />
      <InvestmentFormDialog />
      <DeleteInvestmentDialog />
    </div>
  );
}
