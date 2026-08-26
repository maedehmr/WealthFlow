import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { overviewService } from "@/features/overview/model/overviewService";
import { OverviewQueryKey } from "@/features/overview/model/overviewConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useOverviewSummary() {
  return useApiQuery(
    {
      queryKey: [OverviewQueryKey.Summary],
      queryFn: () => overviewService.getSummary(),
    },
    ErrorCategoryToMessage,
  );
}
