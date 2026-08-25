import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { investmentService } from "@/features/investments/model/investmentService";
import { InvestmentQueryKey } from "@/features/investments/model/investmentConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDeleteInvestment() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (id: string) => investmentService.remove(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [InvestmentQueryKey.Investments],
        }),
    },
    ErrorCategoryToMessage,
  );
}
