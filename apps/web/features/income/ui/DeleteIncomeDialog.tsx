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
import { useDeleteIncome } from "@/features/income/hooks/useDeleteIncome";
import { useIncomeStore } from "@/features/income/model/incomeStore";

export function DeleteIncomeDialog() {
  const isDeleteDialogOpen = useIncomeStore(
    (state) => state.isDeleteDialogOpen
  );
  const selectedIncome = useIncomeStore((state) => state.selectedIncome);
  const closeDeleteDialog = useIncomeStore(
    (state) => state.closeDeleteDialog
  );

  const { mutate, isPending, errorMessage } = useDeleteIncome();

  const handleConfirm = () => {
    if (!selectedIncome) return;
    mutate(selectedIncome.id, { onSuccess: () => closeDeleteDialog() });
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
          <DialogTitle>حذف درآمد</DialogTitle>
          <DialogDescription>
            آیا از حذف این درآمد اطمینان دارید؟ این عملیات قابل بازگشت نیست.
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
