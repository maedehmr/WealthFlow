import { useQueryClient } from "@tanstack/react-query";
import type { UpdateDebtRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { debtService } from "@/features/debts/model/debtService";
import { DebtQueryKey } from "@/features/debts/model/debtConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

interface UpdateDebtVariables {
  id: string;
  data: UpdateDebtRequestModel;
}

export function useUpdateDebt() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: ({ id, data }: UpdateDebtVariables) =>
        debtService.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [DebtQueryKey.Debts],
        }),
    },
    ErrorCategoryToMessage,
  );
}
