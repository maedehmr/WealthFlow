import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateAssetRequestModel } from "@repo/models";
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
    formState: { errors, isValid },
  } = useForm<CreateAssetRequestModel>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

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
      });
    }
  }, [isFormDialogOpen, mode, initialValues, reset, trigger]);

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
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
