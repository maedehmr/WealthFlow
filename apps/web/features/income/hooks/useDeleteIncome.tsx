import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { incomeService } from "@/features/income/model/incomeService";
import { IncomeQueryKey } from "@/features/income/model/incomeConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (id: string) => incomeService.remove(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [IncomeQueryKey.Incomes] }),
    },
    ErrorCategoryToMessage,
  );
}
