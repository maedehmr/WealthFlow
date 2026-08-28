"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { Badge } from "@/shared/components/Badge";
import { useCurrencyRates } from "@/features/currencyRates/hooks/useCurrencyRates";
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
  const { ratesByCode, isLoading: isExchangeRateLoading } =
    useCurrencyRates();
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
        cell: (row: InvestmentItemModel) =>
          row.formatPriceUsd(ratesByCode.get("USD")?.rate),
      },
      {
        key: "quantity",
        header: "تعداد",
        cell: (row: InvestmentItemModel) =>
          row.isCurrencyExposed ? row.formatForeignAmount : row.formatQuantity,
      },
      {
        key: "currentValue",
        header: "ارزش فعلی",
        cell: (row: InvestmentItemModel) => (
          <div className="flex items-center gap-2">
            <span>{row.formatCurrentValue(ratesByCode)}</span>
            {row.isManual && <Badge variant="outline">دستی</Badge>}
          </div>
        ),
      },
      {
        key: "profitAmount",
        header: "سود/زیان (تومان)",
        cell: (row: InvestmentItemModel) => {
          const isProfit = row.isProfit(ratesByCode);
          if (isProfit === null) return "—";
          return (
            <span className={isProfit ? "text-chart-3" : "text-destructive"}>
              {row.formatProfitAmount(ratesByCode)}
            </span>
          );
        },
      },
      {
        key: "profitPercentage",
        header: "سود/زیان (%)",
        cell: (row: InvestmentItemModel) => {
          const isProfit = row.isProfit(ratesByCode);
          if (isProfit === null) return "—";
          return (
            <span className={isProfit ? "text-chart-3" : "text-destructive"}>
              {row.formatProfitPercentage(ratesByCode)}
            </span>
          );
        },
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
    [ratesByCode],
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
