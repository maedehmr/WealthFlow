"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useExchangeRate } from "@/features/income/hooks/useExchangeRate";
import { useIncomes } from "@/features/income/hooks/useIncomes";
import { useIncomeStore } from "@/features/income/model/incomeStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";
import { IncomeItemModel } from "@/features/income/model/incomeModel";

export function useIncomeTable() {
  const {
    data: incomes,
    isLoading: isIncomesLoading,
    errorMessage,
  } = useIncomes();
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();
  const isLoading = isIncomesLoading || isExchangeRateLoading;
  const openEditDialog = useIncomeStore((state) => state.openEditDialog);
  const openDeleteDialog = useIncomeStore((state) => state.openDeleteDialog);

  const columns: TableColumnDef<IncomeItemModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "price",
        header: "قیمت (تومان)",
        cell: (row: IncomeItemModel) => row.formatPrice,
      },
      {
        key: "priceUsd",
        header: "قیمت (دلار)",
        cell: (row: IncomeItemModel) => row.formatPriceUsd(tomanPerUsdRate),
      },
      { key: "source", header: "منبع" },
      {
        key: "date",
        header: "تاریخ",
        cell: (row: IncomeItemModel) => row.formatDate,
      },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: IncomeItemModel) => row.categoryLabel,
      },
    ],
    [tomanPerUsdRate],
  );

  const renderActions = useMemo(() => {
    function IncomeRowActions(row: IncomeItemModel) {
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
    return IncomeRowActions;
  }, [openEditDialog, openDeleteDialog]);

  const table = useTable({
    rows: incomes ?? [],
    columns,
    rowKey: (row: IncomeItemModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
