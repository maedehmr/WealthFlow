import { useQueryClient } from "@tanstack/react-query";
import type { CreateDebtRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { debtService } from "@/features/debts/model/debtService";
import { DebtQueryKey } from "@/features/debts/model/debtConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useCreateDebt() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (data: CreateDebtRequestModel) => debtService.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [DebtQueryKey.Debts],
        }),
    },
    ErrorCategoryToMessage,
  );
}
