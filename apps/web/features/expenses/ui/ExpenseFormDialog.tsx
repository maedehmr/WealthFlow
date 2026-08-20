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
import { NumberInput } from "@/shared/components/NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { Textarea } from "@/shared/components/Textarea";
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
    register,
    control,
    errors,
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
      <DialogContent>
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
        <form className="grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="expense-name">نام</Label>
            <Input id="expense-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-price">قیمت (تومان)</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <NumberInput
                  id="expense-price"
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
            <Label htmlFor="expense-category">دسته‌بندی</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={ExpenseCategoryLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="expense-category">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ExpenseCategoryLabel).map(
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
            <Label htmlFor="expense-date">تاریخ</Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  id="expense-date"
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
            <Label htmlFor="expense-payment-method">روش پرداخت</Label>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={PaymentMethodLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="expense-payment-method">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PaymentMethodLabel).map(
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
            {errors.paymentMethod && (
              <p className="text-destructive text-sm">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="isRecurring"
              render={({ field }) => (
                <Checkbox
                  id="expense-is-recurring"
                  checked={field.value ?? false}
                  onCheckedChange={(checked) =>
                    handleRecurringChange(checked)
                  }
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            <Label htmlFor="expense-is-recurring">هزینه تکرارشونده است</Label>
            {errors.isRecurring && (
              <p className="text-destructive text-sm">
                {errors.isRecurring.message}
              </p>
            )}
          </div>
          {isRecurring && (
            <div className="grid gap-2">
              <Label htmlFor="expense-recurrence-rule">دوره تکرار</Label>
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
                    <SelectTrigger id="expense-recurrence-rule">
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
          <div className="grid gap-2">
            <Label htmlFor="expense-notes">یادداشت</Label>
            <Textarea id="expense-notes" {...register("notes")} />
            {errors.notes && (
              <p className="text-destructive text-sm">
                {errors.notes.message}
              </p>
            )}
          </div>
          {errorMessage && (
            <p className="text-destructive text-sm">{errorMessage}</p>
          )}
          <DialogFooter>
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
