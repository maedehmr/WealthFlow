import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateIncomeRequestModel } from "@repo/models";
import { useCreateIncome } from "@/features/income/hooks/useCreateIncome";
import { useUpdateIncome } from "@/features/income/hooks/useUpdateIncome";
import { useIncomeStore } from "@/features/income/model/incomeStore";
import type { IncomeFormMode } from "@/features/income/model/incomeStore";
import { IncomeItemModel } from "@/features/income/model/incomeModel";

const resolver = classValidatorResolver(CreateIncomeRequestModel);

interface UseIncomeFormOptions {
  mode: IncomeFormMode;
  initialValues: IncomeItemModel | null;
}

export function useIncomeForm({ mode, initialValues }: UseIncomeFormOptions) {
  const isFormDialogOpen = useIncomeStore((state) => state.isFormDialogOpen);
  const closeFormDialog = useIncomeStore((state) => state.closeFormDialog);
  const {
    mutate: createIncome,
    isPending: isCreating,
    errorMessage: createErrorMessage,
  } = useCreateIncome();
  const {
    mutate: updateIncome,
    isPending: isUpdating,
    errorMessage: updateErrorMessage,
  } = useUpdateIncome();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIncomeRequestModel>({ resolver });

  useEffect(() => {
    if (!isFormDialogOpen) return;

    if (mode === "edit" && initialValues) {
      reset({
        name: initialValues.name,
        price: initialValues.price,
        source: initialValues.source,
        date: initialValues.date,
        category: initialValues.category,
      });
    } else {
      reset({
        name: "",
        price: undefined,
        source: "",
        date: undefined,
        category: undefined,
      });
    }
  }, [isFormDialogOpen, mode, initialValues, reset]);

  const onSubmit = handleSubmit((data) => {
    if (mode === "edit" && initialValues) {
      updateIncome(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createIncome(data, {
        onSuccess: () => {
          reset({
            name: "",
            price: 0,
            source: "",
            date: undefined,
            category: undefined,
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
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
