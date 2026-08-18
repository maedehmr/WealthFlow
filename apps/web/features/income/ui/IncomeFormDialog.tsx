"use client";

import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/Button";
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
import { useIncomeForm } from "@/features/income/hooks/useIncomeForm";
import { IncomeCategoryLabel } from "@/features/income/model/incomeConstant";
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
            {formMode === "edit" ? "ویرایش درآمد" : "درآمد جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات درآمد را وارد کنید.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="income-name">نام</Label>
            <Input id="income-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income-price">قیمت (تومان)</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <NumberInput
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
          <div className="grid gap-2">
            <Label htmlFor="income-source">منبع</Label>
            <Input id="income-source" {...register("source")} />
            {errors.source && (
              <p className="text-destructive text-sm">
                {errors.source.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
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
          <div className="grid gap-2">
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
