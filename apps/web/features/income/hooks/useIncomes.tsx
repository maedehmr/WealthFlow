import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { incomeService } from "@/features/income/model/incomeService";
import { IncomeQueryKey } from "@/features/income/model/incomeConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useIncomes() {
  return useApiQuery(
    {
      queryKey: [IncomeQueryKey.Incomes],
      queryFn: () => incomeService.list(),
    },
    ErrorCategoryToMessage,
  );
}
