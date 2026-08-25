import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateDebtRequestModel } from "@repo/models";
import { useCreateDebt } from "@/features/debts/hooks/useCreateDebt";
import { useUpdateDebt } from "@/features/debts/hooks/useUpdateDebt";
import { useDebtStore } from "@/features/debts/model/debtStore";
import type { DebtFormMode } from "@/features/debts/model/debtStore";
import { DebtItemModel } from "@/features/debts/model/debtModel";

const resolver = classValidatorResolver(CreateDebtRequestModel);

interface UseDebtFormOptions {
  mode: DebtFormMode;
  initialValues: DebtItemModel | null;
}

export function useDebtForm({ mode, initialValues }: UseDebtFormOptions) {
  const isFormDialogOpen = useDebtStore((state) => state.isFormDialogOpen);
  const closeFormDialog = useDebtStore((state) => state.closeFormDialog);
  const {
    mutate: createDebt,
    isPending: isCreating,
    errorMessage: createErrorMessage,
  } = useCreateDebt();
  const {
    mutate: updateDebt,
    isPending: isUpdating,
    errorMessage: updateErrorMessage,
  } = useUpdateDebt();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateDebtRequestModel>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const isRecurring = useWatch({ control, name: "isRecurring" });

  useEffect(() => {
    if (!isFormDialogOpen) return;

    if (mode === "edit" && initialValues) {
      reset({
        name: initialValues.name,
        price: initialValues.price,
        category: initialValues.category,
        date: initialValues.date,
        isRecurring: initialValues.isRecurring,
        recurrenceRule: initialValues.recurrenceRule,
        creditor: initialValues.creditor,
        notes: initialValues.notes,
      });
      void trigger();
    } else {
      reset({
        name: "",
        price: undefined,
        category: undefined,
        date: undefined,
        isRecurring: false,
        recurrenceRule: undefined,
        creditor: "",
        notes: "",
      });
    }
  }, [isFormDialogOpen, mode, initialValues, reset, trigger]);

  const handleRecurringChange = (checked: boolean) => {
    setValue("isRecurring", checked);
    if (!checked) {
      setValue("recurrenceRule", undefined);
      void trigger("recurrenceRule");
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (mode === "edit" && initialValues) {
      updateDebt(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createDebt(data, {
        onSuccess: () => {
          reset({
            name: "",
            price: 0,
            category: undefined,
            date: undefined,
            isRecurring: false,
            recurrenceRule: undefined,
            creditor: "",
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
    isRecurring,
    handleRecurringChange,
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
