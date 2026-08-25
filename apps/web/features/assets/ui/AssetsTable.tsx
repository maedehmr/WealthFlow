"use client";

import { Plus } from "lucide-react";
import { BaseTable } from "@/shared/components/BaseTable";
import { Button } from "@/shared/components/Button";
import { useAssetTable } from "@/features/assets/hooks/useAssetTable";
import { useAssetStore } from "@/features/assets/model/assetStore";
import { DeleteAssetDialog } from "@/features/assets/ui/DeleteAssetDialog";
import { AssetFormDialog } from "@/features/assets/ui/AssetFormDialog";

export function AssetsTable() {
  const { columns, rows, rowKey, actions, isLoading, errorMessage } =
    useAssetTable();
  const openCreateDialog = useAssetStore((state) => state.openCreateDialog);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">دارایی‌ها</h1>
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
        emptyState="هنوز دارایی‌ای ثبت نشده است"
        actions={actions}
      />
      <AssetFormDialog />
      <DeleteAssetDialog />
    </div>
  );
}
