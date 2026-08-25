import { useQueryClient } from "@tanstack/react-query";
import type { CreateInvestmentRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { investmentService } from "@/features/investments/model/investmentService";
import { InvestmentQueryKey } from "@/features/investments/model/investmentConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (data: CreateInvestmentRequestModel) =>
        investmentService.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [InvestmentQueryKey.Investments],
        }),
    },
    ErrorCategoryToMessage,
  );
}
