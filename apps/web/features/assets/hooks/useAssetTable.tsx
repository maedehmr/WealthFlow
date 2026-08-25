"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useExchangeRate } from "@/features/assets/hooks/useExchangeRate";
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
  const { data: tomanPerUsdRate, isLoading: isExchangeRateLoading } =
    useExchangeRate();
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
        header: "ارزش (تومان)",
        cell: (row: AssetItemModel) => row.formatValue,
      },
      {
        key: "valueUsd",
        header: "ارزش (دلار)",
        cell: (row: AssetItemModel) => row.formatValueUsd(tomanPerUsdRate),
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
    [tomanPerUsdRate],
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
