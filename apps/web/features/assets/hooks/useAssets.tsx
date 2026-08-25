import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { assetService } from "@/features/assets/model/assetService";
import { AssetQueryKey } from "@/features/assets/model/assetConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useAssets() {
  return useApiQuery(
    {
      queryKey: [AssetQueryKey.Assets],
      queryFn: () => assetService.list(),
    },
    ErrorCategoryToMessage,
  );
}
