"use client";

import { X } from "lucide-react";
import { InvestmentCategory } from "@repo/models";
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
  FormNumberField,
  FormPriceField,
  FormSelectField,
  FormTextField,
  FormTextareaField,
} from "@/shared/components/form";
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
    control,
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
          <FormTextField control={control} name="name" label="نام" />
          <FormSelectField
            control={control}
            name="category"
            label="دسته‌بندی"
            items={InvestmentCategoryLabel}
          />
          <FormPriceField
            control={control}
            name="price"
            label={priceLabel(category)}
          />
          <FormNumberField
            control={control}
            name="quantity"
            label={quantityLabel(category)}
          />
          <FormDateField
            control={control}
            name="purchaseDate"
            label="تاریخ خرید"
          />
          <FormTextField control={control} name="broker" label="پلتفرم" />
          <FormCheckboxField
            control={control}
            name="isRecurring"
            label="سرمایه‌گذاری تکرارشونده است"
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
