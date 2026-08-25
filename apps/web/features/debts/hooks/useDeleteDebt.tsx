import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { debtService } from "@/features/debts/model/debtService";
import { DebtQueryKey } from "@/features/debts/model/debtConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDeleteDebt() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (id: string) => debtService.remove(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [DebtQueryKey.Debts],
        }),
    },
    ErrorCategoryToMessage,
  );
}
