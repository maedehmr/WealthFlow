import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { expenseService } from "@/features/expenses/model/expenseService";
import { ExpenseQueryKey } from "@/features/expenses/model/expenseConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useExpenses() {
  return useApiQuery(
    {
      queryKey: [ExpenseQueryKey.Expenses],
      queryFn: () => expenseService.list(),
    },
    ErrorCategoryToMessage,
  );
}
