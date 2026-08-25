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
import { useDeleteDebt } from "@/features/debts/hooks/useDeleteDebt";
import { useDebtStore } from "@/features/debts/model/debtStore";

export function DeleteDebtDialog() {
  const isDeleteDialogOpen = useDebtStore(
    (state) => state.isDeleteDialogOpen
  );
  const selectedDebt = useDebtStore((state) => state.selectedDebt);
  const closeDeleteDialog = useDebtStore((state) => state.closeDeleteDialog);

  const { mutate, isPending, errorMessage } = useDeleteDebt();

  const handleConfirm = () => {
    if (!selectedDebt) return;
    mutate(selectedDebt.id, { onSuccess: () => closeDeleteDialog() });
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
          <DialogTitle>حذف بدهی</DialogTitle>
          <DialogDescription>
            آیا از حذف این بدهی اطمینان دارید؟ این عملیات قابل بازگشت نیست.
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
