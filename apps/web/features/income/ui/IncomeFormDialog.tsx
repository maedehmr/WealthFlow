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
import { useIncomeForm } from "@/features/income/hooks/useIncomeForm";
import {
  IncomeCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/income/model/incomeConstant";
import { useIncomeStore } from "@/features/income/model/incomeStore";

export function IncomeFormDialog() {
  const isFormDialogOpen = useIncomeStore((state) => state.isFormDialogOpen);
  const formMode = useIncomeStore((state) => state.formMode);
  const selectedIncome = useIncomeStore((state) => state.selectedIncome);
  const closeFormDialog = useIncomeStore((state) => state.closeFormDialog);

  const {
    control,
    isValid,
    isRecurring,
    handleRecurringChange,
    onSubmit,
    isPending,
    errorMessage,
  } = useIncomeForm({ mode: formMode, initialValues: selectedIncome });

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
            {formMode === "edit" ? "ویرایش درآمد" : "درآمد جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات درآمد را وارد کنید.</DialogDescription>
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
          <FormTextField control={control} name="source" label="منبع" />
          <FormDateField control={control} name="date" label="تاریخ" />
          <FormSelectField
            control={control}
            name="category"
            label="دسته‌بندی"
            items={IncomeCategoryLabel}
          />
          <FormCheckboxField
            control={control}
            name="isRecurring"
            label="درآمد تکرارشونده است"
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
