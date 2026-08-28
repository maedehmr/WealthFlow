"use client";

import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { ValuationMode } from "@repo/models";
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
import { PriceInput } from "@/shared/components/PriceInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { Textarea } from "@/shared/components/Textarea";
import { useAssetForm } from "@/features/assets/hooks/useAssetForm";
import {
  AssetCategoryLabel,
  ValuationModeLabel,
} from "@/features/assets/model/assetConstant";
import { useAssetStore } from "@/features/assets/model/assetStore";

export function AssetFormDialog() {
  const isFormDialogOpen = useAssetStore((state) => state.isFormDialogOpen);
  const formMode = useAssetStore((state) => state.formMode);
  const selectedAsset = useAssetStore((state) => state.selectedAsset);
  const closeFormDialog = useAssetStore((state) => state.closeFormDialog);

  const {
    register,
    control,
    errors,
    isValid,
    valuationMode,
    handleValuationModeChange,
    onSubmit,
    isPending,
    errorMessage,
  } = useAssetForm({ mode: formMode, initialValues: selectedAsset });

  const isManual = !valuationMode || valuationMode === ValuationMode.Manual;

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
          <div className="grid gap-2">
            <Label htmlFor="asset-name">نام</Label>
            <Input id="asset-name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset-category">دسته‌بندی</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={AssetCategoryLabel}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="asset-category">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AssetCategoryLabel).map(
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
            <Label htmlFor="asset-value">
              {isManual ? "ارزش (تومان)" : "قیمت خرید هر واحد (تومان)"}
            </Label>
            <Controller
              control={control}
              name="value"
              render={({ field }) => (
                <PriceInput
                  id="asset-value"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.value && (
              <p className="text-destructive text-sm">{errors.value.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset-acquisition-date">تاریخ تملک</Label>
            <Controller
              control={control}
              name="acquisitionDate"
              render={({ field }) => (
                <DatePicker
                  id="asset-acquisition-date"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onClose={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
            {errors.acquisitionDate && (
              <p className="text-destructive text-sm">
                {errors.acquisitionDate.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="asset-valuation-mode">نوع ارزش‌گذاری</Label>
            <Controller
              control={control}
              name="valuationMode"
              render={({ field }) => (
                <Select
                  name={field.name}
                  items={ValuationModeLabel}
                  value={field.value ?? null}
                  onValueChange={(value) =>
                    handleValuationModeChange(value as ValuationMode)
                  }
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  disabled={field.disabled}
                >
                  <SelectTrigger id="asset-valuation-mode">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ValuationModeLabel).map(
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
            {errors.valuationMode && (
              <p className="text-destructive text-sm">
                {errors.valuationMode.message}
              </p>
            )}
          </div>
          {!isManual && (
            <div className="grid gap-2">
              <Label htmlFor="asset-currency-code">کد ارز</Label>
              <Input
                id="asset-currency-code"
                placeholder="USD"
                {...register("currencyCode")}
              />
              {errors.currencyCode && (
                <p className="text-destructive text-sm">
                  {errors.currencyCode.message}
                </p>
              )}
            </div>
          )}
          {valuationMode === ValuationMode.CurrencyExposed && (
            <div className="grid gap-2">
              <Label htmlFor="asset-foreign-amount">
                مقدار ارز (مثلاً تعداد دلار)
              </Label>
              <Controller
                control={control}
                name="foreignAmount"
                render={({ field }) => (
                  <NumberInput
                    id="asset-foreign-amount"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                )}
              />
              {errors.foreignAmount && (
                <p className="text-destructive text-sm">
                  {errors.foreignAmount.message}
                </p>
              )}
            </div>
          )}
          {isManual && (
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="asset-latest-manual-value">
                ارزش فعلی (تومان)
              </Label>
              <Controller
                control={control}
                name="latestManualValue"
                render={({ field }) => (
                  <PriceInput
                    id="asset-latest-manual-value"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                )}
              />
              {errors.latestManualValue && (
                <p className="text-destructive text-sm">
                  {errors.latestManualValue.message}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="asset-location">محل نگهداری</Label>
            <Input id="asset-location" {...register("location")} />
            {errors.location && (
              <p className="text-destructive text-sm">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="asset-notes">یادداشت</Label>
            <Textarea id="asset-notes" {...register("notes")} />
            {errors.notes && (
              <p className="text-destructive text-sm">{errors.notes.message}</p>
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
