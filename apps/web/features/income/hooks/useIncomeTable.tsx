"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { IncomeModel } from "@repo/models";
import { Button } from "@/shared/components/Button";
import { formatJalaliDate, formatToman, formatUsd } from "@/shared/lib/format";
import { IncomeCategoryLabel } from "@/features/income/model/incomeConstant";
import { useExchangeRate } from "@/features/income/hooks/useExchangeRate";
import { useIncomes } from "@/features/income/hooks/useIncomes";
import { useIncomeStore } from "@/features/income/model/incomeStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";

export function useIncomeTable() {
  const { data: incomes, isLoading: isIncomesLoading, errorMessage } = useIncomes();
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } = useExchangeRate();
  const isLoading = isIncomesLoading || isExchangeRateLoading;
  const openEditDialog = useIncomeStore((state) => state.openEditDialog);
  const openDeleteDialog = useIncomeStore((state) => state.openDeleteDialog);

  const columns: TableColumnDef<IncomeModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "price",
        header: "قیمت (تومان)",
        cell: (row: IncomeModel) => formatToman(row.price),
      },
      {
        key: "priceUsd",
        header: "قیمت (دلار)",
        cell: (row: IncomeModel) =>
          tomanPerUsdRate ? formatUsd(row.price / tomanPerUsdRate) : "—",
      },
      { key: "source", header: "منبع" },
      {
        key: "date",
        header: "تاریخ",
        cell: (row: IncomeModel) => formatJalaliDate(row.date),
      },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: IncomeModel) => IncomeCategoryLabel[row.category],
      },
    ],
    [tomanPerUsdRate],
  );

  const renderActions = useMemo(() => {
    function IncomeRowActions(row: IncomeModel) {
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
    rowKey: (row: IncomeModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
