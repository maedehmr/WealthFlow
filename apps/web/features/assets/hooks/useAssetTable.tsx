"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useCurrencyRates } from "@/features/currencyRates/hooks/useCurrencyRates";
import { useAssets } from "@/features/assets/hooks/useAssets";
import { useAssetStore } from "@/features/assets/model/assetStore";
import { TableColumnDef, useTable } from "@/shared/hooks/useTable";
import { AssetItemModel } from "@/features/assets/model/assetModel";

export function useAssetTable() {
  const {
    data: assets,
    isLoading: isAssetsLoading,
    errorMessage,
  } = useAssets();
  const { ratesByCode, isLoading: isExchangeRateLoading } =
    useCurrencyRates();
  const isLoading = isAssetsLoading || isExchangeRateLoading;
  const openEditDialog = useAssetStore((state) => state.openEditDialog);
  const openDeleteDialog = useAssetStore((state) => state.openDeleteDialog);

  const columns: TableColumnDef<AssetItemModel>[] = useMemo(
    () => [
      { key: "name", header: "نام" },
      {
        key: "category",
        header: "دسته‌بندی",
        cell: (row: AssetItemModel) => row.categoryLabel,
      },
      {
        key: "value",
        header: "قیمت خرید (تومان)",
        cell: (row: AssetItemModel) => row.formatValue,
      },
      {
        key: "quantity",
        header: "مقدار",
        cell: (row: AssetItemModel) => row.formatQuantity,
      },
      {
        key: "currentValue",
        header: "ارزش فعلی",
        cell: (row: AssetItemModel) => row.formatCurrentValue(ratesByCode),
      },
      {
        key: "profitAmount",
        header: "سود/زیان (تومان)",
        cell: (row: AssetItemModel) => {
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
        cell: (row: AssetItemModel) => {
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
        key: "acquisitionDate",
        header: "تاریخ تملک",
        cell: (row: AssetItemModel) => row.formatAcquisitionDate,
      },
      {
        key: "location",
        header: "محل نگهداری",
        cell: (row: AssetItemModel) => row.location ?? "—",
      },
    ],
    [ratesByCode],
  );

  const renderActions = useMemo(() => {
    function AssetRowActions(row: AssetItemModel) {
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
    return AssetRowActions;
  }, [openEditDialog, openDeleteDialog]);

  const table = useTable({
    rows: assets ?? [],
    columns,
    rowKey: (row: AssetItemModel) => row.id,
    renderActions,
  });

  return {
    ...table,
    isLoading,
    errorMessage,
  };
}
