"use client";

import { Button } from "@/shared/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/Dialog";
import { useDeleteAsset } from "@/features/assets/hooks/useDeleteAsset";
import { useAssetStore } from "@/features/assets/model/assetStore";

export function DeleteAssetDialog() {
  const isDeleteDialogOpen = useAssetStore((state) => state.isDeleteDialogOpen);
  const selectedAsset = useAssetStore((state) => state.selectedAsset);
  const closeDeleteDialog = useAssetStore((state) => state.closeDeleteDialog);

  const { mutate, isPending, errorMessage } = useDeleteAsset();

  const handleConfirm = () => {
    if (!selectedAsset) return;
    mutate(selectedAsset.id, { onSuccess: () => closeDeleteDialog() });
  };

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={(open) => {
        if (!open) closeDeleteDialog();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف دارایی</DialogTitle>
          <DialogDescription>
            آیا از حذف این دارایی اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={closeDeleteDialog}
            disabled={isPending}
          >
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
