"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useExchangeRate } from "@/features/debts/hooks/useExchangeRate";
import { useDebts } from "@/features/debts/hooks/useDebts";
import { useDebtStore } from "@/features/debts/model/debtStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";
import { DebtItemModel } from "@/features/debts/model/debtModel";

export function useDebtTable() {
  const { data: debts, isLoading: isDebtsLoading, errorMessage } = useDebts();
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();
  const isLoading = isDebtsLoading || isExchangeRateLoading;
  const openEditDialog = useDebtStore((state) => state.openEditDialog);
  const openDeleteDialog = useDebtStore((state) => state.openDeleteDialog);

  const columns: TableColumnDef<DebtItemModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "price",
        header: "مبلغ (تومان)",
        cell: (row: DebtItemModel) => row.formatPrice,
      },
      {
        key: "priceUsd",
        header: "مبلغ (دلار)",
        cell: (row: DebtItemModel) => row.formatPriceUsd(tomanPerUsdRate),
      },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: DebtItemModel) => row.categoryLabel,
      },
      {
        key: "date",
        header: "سررسید",
        cell: (row: DebtItemModel) => row.formatDate,
      },
      {
        key: "creditor",
        header: "طلبکار",
        cell: (row: DebtItemModel) => row.creditor ?? "—",
      },
      {
        key: "recurrenceRule",
        header: "تکرار",
        cell: (row: DebtItemModel) => row.recurrenceRuleLabel,
      },
    ],
    [tomanPerUsdRate],
  );

  const renderActions = useMemo(() => {
    function DebtRowActions(row: DebtItemModel) {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => openEditDialog(row)}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => openDeleteDialog(row)}
          >
            <Trash2 />
          </Button>
        </div>
      );
    }
    return DebtRowActions;
  }, [openEditDialog, openDeleteDialog]);

  const table = useTable({
    rows: debts ?? [],
    columns,
    rowKey: (row: DebtItemModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
