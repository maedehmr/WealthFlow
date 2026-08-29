import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateInvestmentRequestModel } from "@repo/models";
import { useCreateInvestment } from "@/features/investments/hooks/useCreateInvestment";
import { useUpdateInvestment } from "@/features/investments/hooks/useUpdateInvestment";
import { useInvestmentStore } from "@/features/investments/model/investmentStore";
import type { InvestmentFormMode } from "@/features/investments/model/investmentStore";
import { InvestmentItemModel } from "@/features/investments/model/investmentModel";

const resolver = classValidatorResolver(CreateInvestmentRequestModel);

interface UseInvestmentFormOptions {
  mode: InvestmentFormMode;
  initialValues: InvestmentItemModel | null;
}

const EMPTY_FORM: Partial<CreateInvestmentRequestModel> = {
  name: "",
  category: undefined,
  price: undefined,
  purchaseDate: undefined,
  broker: "",
  isRecurring: false,
  recurrenceRule: undefined,
  notes: "",
  quantity: undefined,
};

export function useInvestmentForm({
  mode,
  initialValues,
}: UseInvestmentFormOptions) {
  const isFormDialogOpen = useInvestmentStore(
    (state) => state.isFormDialogOpen,
  );
  const closeFormDialog = useInvestmentStore((state) => state.closeFormDialog);
  const {
    mutate: createInvestment,
    isPending: isCreating,
    errorMessage: createErrorMessage,
  } = useCreateInvestment();
  const {
    mutate: updateInvestment,
    isPending: isUpdating,
    errorMessage: updateErrorMessage,
  } = useUpdateInvestment();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateInvestmentRequestModel>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const isRecurring = useWatch({ control, name: "isRecurring" });
  const category = useWatch({ control, name: "category" });

  useEffect(() => {
    if (!isFormDialogOpen) return;

    if (mode === "edit" && initialValues) {
      reset({
        name: initialValues.name,
        category: initialValues.category,
        price: initialValues.price,
        purchaseDate: initialValues.purchaseDate,
        broker: initialValues.broker,
        isRecurring: initialValues.isRecurring,
        recurrenceRule: initialValues.recurrenceRule,
        notes: initialValues.notes,
        quantity: initialValues.quantity,
      });
      void trigger();
    } else {
      reset(EMPTY_FORM);
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
      updateInvestment(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createInvestment(data, {
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
    isRecurring,
    category,
    handleRecurringChange,
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
