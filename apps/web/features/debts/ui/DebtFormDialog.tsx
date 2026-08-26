"use client";

import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/Button";
import { Checkbox } from "@/shared/components/Checkbox";
import { DatePicker } from "@/shared/components/DatePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/Dialog";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { PriceInput } from "@/shared/components/PriceInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { Textarea } from "@/shared/components/Textarea";
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
    register,
    control,
    errors,
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
          <div className="grid gap-2">
            <Label htmlFor="debt-name">نام</Label>
            <Input id="debt-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="debt-price">مبلغ (تومان)</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <PriceInput
                  id="debt-price"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.price && (
              <p className="text-destructive text-sm">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="debt-category">دسته‌بندی</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={DebtCategoryLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="debt-category">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DebtCategoryLabel).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-destructive text-sm">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="debt-date">سررسید</Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  id="debt-date"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onClose={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.date && (
              <p className="text-destructive text-sm">{errors.date.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="debt-creditor">طلبکار</Label>
            <Input id="debt-creditor" {...register("creditor")} />
            {errors.creditor && (
              <p className="text-destructive text-sm">
                {errors.creditor.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="isRecurring"
              render={({ field }) => (
                <Checkbox
                  id="debt-is-recurring"
                  checked={field.value ?? false}
                  onCheckedChange={(checked) =>
                    handleRecurringChange(checked)
                  }
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            <Label htmlFor="debt-is-recurring">بدهی تکرارشونده است</Label>
            {errors.isRecurring && (
              <p className="text-destructive text-sm">
                {errors.isRecurring.message}
              </p>
            )}
          </div>
          {isRecurring && (
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="debt-recurrence-rule">دوره تکرار</Label>
              <Controller
                control={control}
                name="recurrenceRule"
                render={({ field }) => (
                  <Select
                    name={field.name}
                    items={RecurrenceRuleLabel}
                    value={field.value ?? null}
                    onValueChange={(value) => field.onChange(value)}
                    onOpenChange={(open) => {
                      if (!open) field.onBlur();
                    }}
                    disabled={field.disabled}
                  >
                    <SelectTrigger id="debt-recurrence-rule">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RecurrenceRuleLabel).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.recurrenceRule && (
                <p className="text-destructive text-sm">
                  {errors.recurrenceRule.message}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="debt-notes">یادداشت</Label>
            <Textarea id="debt-notes" {...register("notes")} />
            {errors.notes && (
              <p className="text-destructive text-sm">
                {errors.notes.message}
              </p>
            )}
          </div>
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
