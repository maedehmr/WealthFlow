import { useQueryClient } from "@tanstack/react-query";
import type { UpdateIncomeRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { incomeService } from "@/features/income/model/incomeService";
import { IncomeQueryKey } from "@/features/income/model/incomeConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

interface UpdateIncomeVariables {
  id: string;
  data: UpdateIncomeRequestModel;
}

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: ({ id, data }: UpdateIncomeVariables) =>
        incomeService.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [IncomeQueryKey.Incomes] }),
    },
    ErrorCategoryToMessage,
  );
}
