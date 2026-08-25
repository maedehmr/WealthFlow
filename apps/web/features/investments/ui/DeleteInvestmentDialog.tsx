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
import { useDeleteInvestment } from "@/features/investments/hooks/useDeleteInvestment";
import { useInvestmentStore } from "@/features/investments/model/investmentStore";

export function DeleteInvestmentDialog() {
  const isDeleteDialogOpen = useInvestmentStore(
    (state) => state.isDeleteDialogOpen,
  );
  const selectedInvestment = useInvestmentStore(
    (state) => state.selectedInvestment,
  );
  const closeDeleteDialog = useInvestmentStore(
    (state) => state.closeDeleteDialog,
  );

  const { mutate, isPending, errorMessage } = useDeleteInvestment();

  const handleConfirm = () => {
    if (!selectedInvestment) return;
    mutate(selectedInvestment.id, { onSuccess: () => closeDeleteDialog() });
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
          <DialogTitle>حذف سرمایه‌گذاری</DialogTitle>
          <DialogDescription>
            آیا از حذف این سرمایه‌گذاری اطمینان دارید؟ این عملیات قابل بازگشت
            نیست.
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
