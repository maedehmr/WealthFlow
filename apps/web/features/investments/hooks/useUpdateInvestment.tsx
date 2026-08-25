import { useQueryClient } from "@tanstack/react-query";
import type { UpdateInvestmentRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { investmentService } from "@/features/investments/model/investmentService";
import { InvestmentQueryKey } from "@/features/investments/model/investmentConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

interface UpdateInvestmentVariables {
  id: string;
  data: UpdateInvestmentRequestModel;
}

export function useUpdateInvestment() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: ({ id, data }: UpdateInvestmentVariables) =>
        investmentService.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [InvestmentQueryKey.Investments],
        }),
    },
    ErrorCategoryToMessage,
  );
}
