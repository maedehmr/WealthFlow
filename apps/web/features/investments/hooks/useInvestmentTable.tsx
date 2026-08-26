"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useExchangeRate } from "@/features/investments/hooks/useExchangeRate";
import { useInvestments } from "@/features/investments/hooks/useInvestments";
import { useInvestmentStore } from "@/features/investments/model/investmentStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";
import { InvestmentItemModel } from "@/features/investments/model/investmentModel";

export function useInvestmentTable() {
  const {
    data: investments,
    isLoading: isInvestmentsLoading,
    errorMessage,
  } = useInvestments();
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();
  const isLoading = isInvestmentsLoading || isExchangeRateLoading;
  const openEditDialog = useInvestmentStore((state) => state.openEditDialog);
  const openDeleteDialog = useInvestmentStore(
    (state) => state.openDeleteDialog,
  );

  const columns: TableColumnDef<InvestmentItemModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: InvestmentItemModel) => row.categoryLabel,
      },
      {
        key: "price",
        header: "قیمت (تومان)",
        cell: (row: InvestmentItemModel) => row.formatPrice,
      },
      {
        key: "priceUsd",
        header: "قیمت (دلار)",
        cell: (row: InvestmentItemModel) => row.formatPriceUsd(tomanPerUsdRate),
      },
      {
        key: "quantity",
        header: "تعداد",
        cell: (row: InvestmentItemModel) => row.formatQuantity,
      },
      {
        key: "purchaseDate",
        header: "تاریخ خرید",
        cell: (row: InvestmentItemModel) => row.formatPurchaseDate,
      },
      {
        key: "broker",
        header: "کارگزاری/صرافی",
        cell: (row: InvestmentItemModel) => row.broker ?? "—",
      },
    ],
    [tomanPerUsdRate],
  );

  const renderActions = useMemo(() => {
    function InvestmentRowActions(row: InvestmentItemModel) {
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
    return InvestmentRowActions;
  }, [openEditDialog, openDeleteDialog]);

  const table = useTable({
    rows: investments ?? [],
    columns,
    rowKey: (row: InvestmentItemModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
