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
import { useExpenseForm } from "@/features/expenses/hooks/useExpenseForm";
import {
  ExpenseCategoryLabel,
  PaymentMethodLabel,
  RecurrenceRuleLabel,
} from "@/features/expenses/model/expenseConstant";
import { useExpenseStore } from "@/features/expenses/model/expenseStore";

export function ExpenseFormDialog() {
  const isFormDialogOpen = useExpenseStore((state) => state.isFormDialogOpen);
  const formMode = useExpenseStore((state) => state.formMode);
  const selectedExpense = useExpenseStore((state) => state.selectedExpense);
  const closeFormDialog = useExpenseStore((state) => state.closeFormDialog);

  const {
    control,
    isValid,
    isRecurring,
    handleRecurringChange,
    onSubmit,
    isPending,
    errorMessage,
  } = useExpenseForm({ mode: formMode, initialValues: selectedExpense });

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
            {formMode === "edit" ? "ویرایش هزینه" : "هزینه جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات هزینه را وارد کنید.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={onSubmit}
          noValidate
        >
          <FormTextField control={control} name="name" label="نام" />
          <FormPriceField
            control={control}
            name="price"
            label="قیمت (تومان)"
          />
          <FormSelectField
            control={control}
            name="category"
            label="دسته‌بندی"
            items={ExpenseCategoryLabel}
          />
          <FormDateField control={control} name="date" label="تاریخ" />
          <FormSelectField
            control={control}
            name="paymentMethod"
            label="روش پرداخت"
            items={PaymentMethodLabel}
          />
          <FormCheckboxField
            control={control}
            name="isRecurring"
            label="هزینه تکرارشونده است"
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
