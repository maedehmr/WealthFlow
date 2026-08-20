import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateExpenseRequestModel } from "@repo/models";
import { useCreateExpense } from "@/features/expenses/hooks/useCreateExpense";
import { useUpdateExpense } from "@/features/expenses/hooks/useUpdateExpense";
import { useExpenseStore } from "@/features/expenses/model/expenseStore";
import type { ExpenseFormMode } from "@/features/expenses/model/expenseStore";
import { ExpenseItemModel } from "@/features/expenses/model/expenseModel";

const resolver = classValidatorResolver(CreateExpenseRequestModel);

interface UseExpenseFormOptions {
  mode: ExpenseFormMode;
  initialValues: ExpenseItemModel | null;
}

export function useExpenseForm({ mode, initialValues }: UseExpenseFormOptions) {
  const isFormDialogOpen = useExpenseStore((state) => state.isFormDialogOpen);
  const closeFormDialog = useExpenseStore((state) => state.closeFormDialog);
  const {
    mutate: createExpense,
    isPending: isCreating,
    errorMessage: createErrorMessage,
  } = useCreateExpense();
  const {
    mutate: updateExpense,
    isPending: isUpdating,
    errorMessage: updateErrorMessage,
  } = useUpdateExpense();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateExpenseRequestModel>({
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
        paymentMethod: initialValues.paymentMethod,
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
        paymentMethod: undefined,
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
      updateExpense(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createExpense(data, {
        onSuccess: () => {
          reset({
            name: "",
            price: 0,
            category: undefined,
            date: undefined,
            isRecurring: false,
            recurrenceRule: undefined,
            paymentMethod: undefined,
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
