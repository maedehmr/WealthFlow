"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useExchangeRate } from "@/features/expenses/hooks/useExchangeRate";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { useExpenseStore } from "@/features/expenses/model/expenseStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";
import { ExpenseItemModel } from "@/features/expenses/model/expenseModel";

export function useExpenseTable() {
  const {
    data: expenses,
    isLoading: isExpensesLoading,
    errorMessage,
  } = useExpenses();
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();
  const isLoading = isExpensesLoading || isExchangeRateLoading;
  const openEditDialog = useExpenseStore((state) => state.openEditDialog);
  const openDeleteDialog = useExpenseStore((state) => state.openDeleteDialog);

  const columns: TableColumnDef<ExpenseItemModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "price",
        header: "قیمت (تومان)",
        cell: (row: ExpenseItemModel) => row.formatPrice,
      },
      {
        key: "priceUsd",
        header: "قیمت (دلار)",
        cell: (row: ExpenseItemModel) => row.formatPriceUsd(tomanPerUsdRate),
      },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: ExpenseItemModel) => row.categoryLabel,
      },
      {
        key: "date",
        header: "تاریخ",
        cell: (row: ExpenseItemModel) => row.formatDate,
      },
      {
        key: "paymentMethod",
        header: "روش پرداخت",
        cell: (row: ExpenseItemModel) => row.paymentMethodLabel,
      },
      {
        key: "recurrenceRule",
        header: "تکرار",
        cell: (row: ExpenseItemModel) => row.recurrenceRuleLabel,
      },
    ],
    [tomanPerUsdRate],
  );

  const renderActions = useMemo(() => {
    function ExpenseRowActions(row: ExpenseItemModel) {
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
    return ExpenseRowActions;
  }, [openEditDialog, openDeleteDialog]);

  const table = useTable({
    rows: expenses ?? [],
    columns,
    rowKey: (row: ExpenseItemModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
