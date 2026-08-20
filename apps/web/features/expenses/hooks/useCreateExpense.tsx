import { useQueryClient } from "@tanstack/react-query";
import type { CreateExpenseRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { expenseService } from "@/features/expenses/model/expenseService";
import { ExpenseQueryKey } from "@/features/expenses/model/expenseConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (data: CreateExpenseRequestModel) =>
        expenseService.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [ExpenseQueryKey.Expenses],
        }),
    },
    ErrorCategoryToMessage,
  );
}
