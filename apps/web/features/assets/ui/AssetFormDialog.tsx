"use client";

import { X } from "lucide-react";
import { AssetCategory } from "@repo/models";
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
  FormDateField,
  FormNumberField,
  FormPriceField,
  FormSelectField,
  FormTextField,
  FormTextareaField,
} from "@/shared/components/form";
import { useAssetForm } from "@/features/assets/hooks/useAssetForm";
import { AssetCategoryLabel } from "@/features/assets/model/assetConstant";
import { useAssetStore } from "@/features/assets/model/assetStore";

function isDynamicCategory(category?: AssetCategory): boolean {
  return category === AssetCategory.Gold || category === AssetCategory.Dollar;
}

function valueLabel(category?: AssetCategory): string {
  if (category === AssetCategory.Gold) return "قیمت خرید هر گرم (تومان)";
  if (category === AssetCategory.Dollar) return "نرخ خرید هر دلار (تومان)";
  return "قیمت خرید (تومان)";
}

function quantityLabel(category?: AssetCategory): string {
  return category === AssetCategory.Gold ? "مقدار (گرم)" : "مقدار (دلار)";
}

export function AssetFormDialog() {
  const isFormDialogOpen = useAssetStore((state) => state.isFormDialogOpen);
  const formMode = useAssetStore((state) => state.formMode);
  const selectedAsset = useAssetStore((state) => state.selectedAsset);
  const closeFormDialog = useAssetStore((state) => state.closeFormDialog);

  const { control, isValid, category, onSubmit, isPending, errorMessage } =
    useAssetForm({ mode: formMode, initialValues: selectedAsset });

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
            {formMode === "edit" ? "ویرایش دارایی" : "دارایی جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات دارایی را وارد کنید.</DialogDescription>
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
            items={AssetCategoryLabel}
          />
          <FormPriceField
            control={control}
            name="value"
            label={valueLabel(category)}
          />
          {isDynamicCategory(category) && (
            <FormNumberField
              control={control}
              name="quantity"
              label={quantityLabel(category)}
            />
          )}
          <FormDateField
            control={control}
            name="acquisitionDate"
            label="تاریخ تملک"
          />
          <FormTextField
            control={control}
            name="location"
            label="محل نگهداری"
            className="sm:col-span-2"
          />
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
