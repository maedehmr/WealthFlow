import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AssetCategory, CreateAssetRequestModel } from "@repo/models";
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

const EMPTY_FORM: Partial<CreateAssetRequestModel> = {
  name: "",
  category: undefined,
  value: undefined,
  acquisitionDate: undefined,
  location: "",
  notes: "",
  quantity: undefined,
};

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
    formState: { errors, isValid },
  } = useForm<CreateAssetRequestModel>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const category = useWatch({ control, name: "category" });

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
        quantity: initialValues.quantity,
      });
      void trigger();
    } else {
      reset(EMPTY_FORM);
    }
  }, [isFormDialogOpen, mode, initialValues, reset, trigger]);

  const onSubmit = handleSubmit((data) => {
    const isDynamic =
      data.category === AssetCategory.Gold ||
      data.category === AssetCategory.Dollar;
    if (!isDynamic) {
      data.quantity = undefined;
    }

    if (mode === "edit" && initialValues) {
      updateAsset(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createAsset(data, {
        onSuccess: () => {
          reset(EMPTY_FORM);
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
    category,
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
