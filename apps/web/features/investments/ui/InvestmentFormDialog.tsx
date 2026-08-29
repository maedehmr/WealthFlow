"use client";

import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { InvestmentCategory } from "@repo/models";
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
import { PriceInput } from "@/shared/components/PriceInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { Textarea } from "@/shared/components/Textarea";
import { useInvestmentForm } from "@/features/investments/hooks/useInvestmentForm";
import {
  InvestmentCategoryLabel,
  RecurrenceRuleLabel,
} from "@/features/investments/model/investmentConstant";
import { useInvestmentStore } from "@/features/investments/model/investmentStore";

function priceLabel(category?: InvestmentCategory): string {
  if (category === InvestmentCategory.Gold) return "قیمت خرید هر گرم (تومان)";
  if (category === InvestmentCategory.Dollar) return "نرخ خرید هر دلار (تومان)";
  return "قیمت (تومان)";
}

function quantityLabel(category?: InvestmentCategory): string {
  if (category === InvestmentCategory.Gold) return "مقدار (گرم)";
  if (category === InvestmentCategory.Dollar) return "مقدار (دلار)";
  return "مقدار";
}

export function InvestmentFormDialog() {
  const isFormDialogOpen = useInvestmentStore(
    (state) => state.isFormDialogOpen,
  );
  const formMode = useInvestmentStore((state) => state.formMode);
  const selectedInvestment = useInvestmentStore(
    (state) => state.selectedInvestment,
  );
  const closeFormDialog = useInvestmentStore((state) => state.closeFormDialog);

  const {
    register,
    control,
    errors,
    isValid,
    isRecurring,
    category,
    handleRecurringChange,
    onSubmit,
    isPending,
    errorMessage,
  } = useInvestmentForm({ mode: formMode, initialValues: selectedInvestment });

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
            {formMode === "edit" ? "ویرایش سرمایه‌گذاری" : "سرمایه‌گذاری جدید"}
          </DialogTitle>
          <DialogDescription>
            اطلاعات سرمایه‌گذاری را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor="investment-name">نام</Label>
            <Input id="investment-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-category">دسته‌بندی</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={InvestmentCategoryLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="investment-category">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(InvestmentCategoryLabel).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ),
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
            <Label htmlFor="investment-price">{priceLabel(category)}</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <PriceInput
                  id="investment-price"
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
            <Label htmlFor="investment-quantity">{quantityLabel(category)}</Label>
            <Controller
              control={control}
              name="quantity"
              render={({ field }) => (
                <NumberInput
                  id="investment-quantity"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.quantity && (
              <p className="text-destructive text-sm">
                {errors.quantity.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-purchase-date">تاریخ خرید</Label>
            <Controller
              control={control}
              name="purchaseDate"
              render={({ field }) => (
                <DatePicker
                  id="investment-purchase-date"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onClose={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.purchaseDate && (
              <p className="text-destructive text-sm">
                {errors.purchaseDate.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-broker">پلتفرم</Label>
            <Input id="investment-broker" {...register("broker")} />
            {errors.broker && (
              <p className="text-destructive text-sm">
                {errors.broker.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="isRecurring"
              render={({ field }) => (
                <Checkbox
                  id="investment-is-recurring"
                  checked={field.value ?? false}
                  onCheckedChange={(checked) =>
                    handleRecurringChange(checked)
                  }
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            <Label htmlFor="investment-is-recurring">
              سرمایه‌گذاری تکرارشونده است
            </Label>
            {errors.isRecurring && (
              <p className="text-destructive text-sm">
                {errors.isRecurring.message}
              </p>
            )}
          </div>
          {isRecurring && (
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="investment-recurrence-rule">دوره تکرار</Label>
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
                    <SelectTrigger id="investment-recurrence-rule">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RecurrenceRuleLabel).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
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
            <Label htmlFor="investment-notes">یادداشت</Label>
            <Textarea id="investment-notes" {...register("notes")} />
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
