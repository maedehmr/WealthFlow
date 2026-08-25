import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { debtService } from "@/features/debts/model/debtService";
import { DebtQueryKey } from "@/features/debts/model/debtConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDebts() {
  return useApiQuery(
    {
      queryKey: [DebtQueryKey.Debts],
      queryFn: () => debtService.list(),
    },
    ErrorCategoryToMessage,
  );
}
