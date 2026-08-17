import { useQueryClient } from "@tanstack/react-query";
import type { CreateIncomeRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { incomeService } from "@/features/income/model/incomeService";
import { IncomeQueryKey } from "@/features/income/model/incomeConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (data: CreateIncomeRequestModel) =>
        incomeService.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [IncomeQueryKey.Incomes] }),
    },
    ErrorCategoryToMessage,
  );
}
