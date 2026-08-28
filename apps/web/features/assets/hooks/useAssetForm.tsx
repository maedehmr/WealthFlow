import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateAssetRequestModel, ValuationMode } from "@repo/models";
import { useCreateAsset } from "@/features/assets/hooks/useCreateAsset";
import { useUpdateAsset } from "@/features/assets/hooks/useUpdateAsset";
import { useAssetStore } from "@/features/assets/model/assetStore";
import type { AssetFormMode } from "@/features/assets/model/assetStore";
import { AssetItemModel } from "@/features/assets/model/assetModel";

const resolver = classValidatorResolver(CreateAssetRequestModel);

interface UseAssetFormOptions {
  mode: AssetFormMode;
  initialValues: AssetItemModel | null;
}

export function useAssetForm({ mode, initialValues }: UseAssetFormOptions) {
  const isFormDialogOpen = useAssetStore((state) => state.isFormDialogOpen);
  const closeFormDialog = useAssetStore((state) => state.closeFormDialog);
  const {
    mutate: createAsset,
    isPending: isCreating,
    errorMessage: createErrorMessage,
  } = useCreateAsset();
  const {
    mutate: updateAsset,
    isPending: isUpdating,
    errorMessage: updateErrorMessage,
  } = useUpdateAsset();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateAssetRequestModel>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const valuationMode = useWatch({ control, name: "valuationMode" });

  useEffect(() => {
    if (!isFormDialogOpen) return;

    if (mode === "edit" && initialValues) {
      reset({
        name: initialValues.name,
        category: initialValues.category,
        value: initialValues.value,
        acquisitionDate: initialValues.acquisitionDate,
        location: initialValues.location,
        notes: initialValues.notes,
        valuationMode: initialValues.valuationMode,
        currencyCode: initialValues.currencyCode,
        foreignAmount: initialValues.foreignAmount,
        latestManualValue: initialValues.latestManualValue,
      });
      void trigger();
    } else {
      reset({
        name: "",
        category: undefined,
        value: undefined,
        acquisitionDate: undefined,
        location: "",
        notes: "",
        valuationMode: ValuationMode.Manual,
        currencyCode: "",
        foreignAmount: undefined,
        latestManualValue: undefined,
      });
    }
  }, [isFormDialogOpen, mode, initialValues, reset, trigger]);

  const handleValuationModeChange = (newValuationMode: ValuationMode) => {
    setValue("valuationMode", newValuationMode);

    const clearedFields: Array<keyof CreateAssetRequestModel> = [];
    if (newValuationMode !== ValuationMode.CurrencyExposed) {
      setValue("foreignAmount", undefined);
      clearedFields.push("foreignAmount");
    }
    if (newValuationMode !== ValuationMode.Manual) {
      setValue("latestManualValue", undefined);
      clearedFields.push("latestManualValue");
    }
    if (newValuationMode === ValuationMode.Manual) {
      setValue("currencyCode", undefined);
      clearedFields.push("currencyCode");
    }

    // Only re-validate fields we just cleared, so their stale errors
    // disappear. Fields that just became required stay untouched until
    // the user actually interacts with them (mode: "onBlur").
    if (clearedFields.length > 0) {
      void trigger(clearedFields);
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (mode === "edit" && initialValues) {
      updateAsset(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createAsset(data, {
        onSuccess: () => {
          reset({
            name: "",
            category: undefined,
            value: undefined,
            acquisitionDate: undefined,
            location: "",
            notes: "",
            valuationMode: ValuationMode.Manual,
            currencyCode: "",
            foreignAmount: undefined,
            latestManualValue: undefined,
          });
          closeFormDialog();
        },
      });
    }
  });

  return {
    register,
    control,
    errors,
    isValid,
    valuationMode,
    handleValuationModeChange,
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
