import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { expenseService } from "@/features/expenses/model/expenseService";
import { ExpenseQueryKey } from "@/features/expenses/model/expenseConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (id: string) => expenseService.remove(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [ExpenseQueryKey.Expenses],
        }),
    },
    ErrorCategoryToMessage,
  );
}
