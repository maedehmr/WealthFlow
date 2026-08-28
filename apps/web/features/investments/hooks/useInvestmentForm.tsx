import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateInvestmentRequestModel, ValuationMode } from "@repo/models";
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
  const valuationMode = useWatch({ control, name: "valuationMode" });

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
        valuationMode: initialValues.valuationMode,
        quantity: initialValues.quantity,
        currencyCode: initialValues.currencyCode,
        foreignAmount: initialValues.foreignAmount,
        latestManualValue: initialValues.latestManualValue,
      });
      void trigger();
    } else {
      reset({
        name: "",
        category: undefined,
        price: undefined,
        purchaseDate: undefined,
        broker: "",
        isRecurring: false,
        recurrenceRule: undefined,
        notes: "",
        valuationMode: ValuationMode.Manual,
        quantity: undefined,
        currencyCode: "",
        foreignAmount: undefined,
        latestManualValue: undefined,
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

  const handleValuationModeChange = (newValuationMode: ValuationMode) => {
    setValue("valuationMode", newValuationMode);

    const clearedFields: Array<keyof CreateInvestmentRequestModel> = [];
    if (newValuationMode !== ValuationMode.CurrencyExposed) {
      setValue("foreignAmount", undefined);
      clearedFields.push("foreignAmount");
    } else {
      // quantity isn't a meaningful multiplier for a currency position
      // (foreignAmount is) — the field is hidden for this mode, so keep
      // it satisfying validation with a neutral default.
      setValue("quantity", 1);
      clearedFields.push("quantity");
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
      updateInvestment(
        { id: initialValues.id, data },
        { onSuccess: () => closeFormDialog() },
      );
    } else {
      createInvestment(data, {
        onSuccess: () => {
          reset({
            name: "",
            category: undefined,
            price: undefined,
            purchaseDate: undefined,
            broker: "",
            isRecurring: false,
            recurrenceRule: undefined,
            notes: "",
            valuationMode: ValuationMode.Manual,
            quantity: undefined,
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
    isRecurring,
    handleRecurringChange,
    valuationMode,
    handleValuationModeChange,
    onSubmit,
    isPending: mode === "edit" ? isUpdating : isCreating,
    errorMessage: mode === "edit" ? updateErrorMessage : createErrorMessage,
  };
}
