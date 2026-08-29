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
    register,
    control,
    errors,
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="income-name">نام</Label>
            <Input id="income-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="income-price">قیمت (تومان)</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <PriceInput
                  id="income-price"
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="income-source">منبع</Label>
            <Input id="income-source" {...register("source")} />
            {errors.source && (
              <p className="text-destructive text-sm">
                {errors.source.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="income-date">تاریخ</Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  id="income-date"
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="income-category">دسته‌بندی</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={IncomeCategoryLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="income-category">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(IncomeCategoryLabel).map(
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
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="isRecurring"
              render={({ field }) => (
                <Checkbox
                  id="income-is-recurring"
                  checked={field.value ?? false}
                  onCheckedChange={(checked) =>
                    handleRecurringChange(checked)
                  }
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            <Label htmlFor="income-is-recurring">درآمد تکرارشونده است</Label>
            {errors.isRecurring && (
              <p className="text-destructive text-sm">
                {errors.isRecurring.message}
              </p>
            )}
          </div>
          {isRecurring && (
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="income-recurrence-rule">دوره تکرار</Label>
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
                    <SelectTrigger id="income-recurrence-rule">
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
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="income-notes">یادداشت</Label>
            <Textarea id="income-notes" {...register("notes")} />
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
