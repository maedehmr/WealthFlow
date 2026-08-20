import { useQueryClient } from "@tanstack/react-query";
import type { UpdateExpenseRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { expenseService } from "@/features/expenses/model/expenseService";
import { ExpenseQueryKey } from "@/features/expenses/model/expenseConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

interface UpdateExpenseVariables {
  id: string;
  data: UpdateExpenseRequestModel;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: ({ id, data }: UpdateExpenseVariables) =>
        expenseService.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [ExpenseQueryKey.Expenses],
        }),
    },
    ErrorCategoryToMessage,
  );
}
