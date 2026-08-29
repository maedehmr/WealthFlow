"use client";

import { X } from "lucide-react";
import { Button } from "@/shared/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/Dialog";
import {
  FormCheckboxField,
  FormDateField,
  FormPriceField,
  FormSelectField,
  FormTextField,
  FormTextareaField,
} from "@/shared/components/form";
import { useDebtForm } from "@/features/debts/hooks/useDebtForm";
import {
  DebtCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/debts/model/debtConstant";
import { useDebtStore } from "@/features/debts/model/debtStore";

export function DebtFormDialog() {
  const isFormDialogOpen = useDebtStore((state) => state.isFormDialogOpen);
  const formMode = useDebtStore((state) => state.formMode);
  const selectedDebt = useDebtStore((state) => state.selectedDebt);
  const closeFormDialog = useDebtStore((state) => state.closeFormDialog);

  const {
    control,
    isValid,
    isRecurring,
    handleRecurringChange,
    onSubmit,
    isPending,
    errorMessage,
  } = useDebtForm({ mode: formMode, initialValues: selectedDebt });

  return (
    <Dialog
      open={isFormDialogOpen}
      onOpenChange={(open) => {
        if (!open) closeFormDialog();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogClose
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 end-4"
            >
              <X />
              <span className="sr-only">بستن</span>
            </Button>
          }
        />
        <DialogHeader>
          <DialogTitle>
            {formMode === "edit" ? "ویرایش بدهی" : "بدهی جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات بدهی را وارد کنید.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={onSubmit}
          noValidate
        >
          <FormTextField control={control} name="name" label="نام" />
          <FormPriceField control={control} name="price" label="مبلغ (تومان)" />
          <FormSelectField
            control={control}
            name="category"
            label="دسته‌بندی"
            items={DebtCategoryLabel}
          />
          <FormDateField control={control} name="date" label="سررسید" />
          <FormTextField control={control} name="creditor" label="طلبکار" />
          <FormCheckboxField
            control={control}
            name="isRecurring"
            label="بدهی تکرارشونده است"
            onCheckedChange={handleRecurringChange}
          />
          {isRecurring && (
            <FormSelectField
              control={control}
              name="recurrenceRule"
              label="دوره تکرار"
              items={RecurrenceRuleLabel}
              className="sm:col-span-2"
            />
          )}
          <FormTextareaField
            control={control}
            name="notes"
            label="یادداشت"
            className="sm:col-span-2"
          />
          {errorMessage && (
            <p className="text-destructive text-sm sm:col-span-2">
              {errorMessage}
            </p>
          )}
          <DialogFooter className="sm:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeFormDialog}
              disabled={isPending}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
