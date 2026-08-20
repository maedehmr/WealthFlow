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
import { useDeleteExpense } from "@/features/expenses/hooks/useDeleteExpense";
import { useExpenseStore } from "@/features/expenses/model/expenseStore";

export function DeleteExpenseDialog() {
  const isDeleteDialogOpen = useExpenseStore(
    (state) => state.isDeleteDialogOpen
  );
  const selectedExpense = useExpenseStore((state) => state.selectedExpense);
  const closeDeleteDialog = useExpenseStore(
    (state) => state.closeDeleteDialog
  );

  const { mutate, isPending, errorMessage } = useDeleteExpense();

  const handleConfirm = () => {
    if (!selectedExpense) return;
    mutate(selectedExpense.id, { onSuccess: () => closeDeleteDialog() });
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
          <DialogTitle>حذف هزینه</DialogTitle>
          <DialogDescription>
            آیا از حذف این هزینه اطمینان دارید؟ این عملیات قابل بازگشت نیست.
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
