import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { investmentService } from "@/features/investments/model/investmentService";
import { InvestmentQueryKey } from "@/features/investments/model/investmentConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useInvestments() {
  return useApiQuery(
    {
      queryKey: [InvestmentQueryKey.Investments],
      queryFn: () => investmentService.list(),
    },
    ErrorCategoryToMessage,
  );
}
