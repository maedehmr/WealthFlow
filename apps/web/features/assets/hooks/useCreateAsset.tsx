import { useQueryClient } from "@tanstack/react-query";
import type { CreateAssetRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { assetService } from "@/features/assets/model/assetService";
import { AssetQueryKey } from "@/features/assets/model/assetConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (data: CreateAssetRequestModel) => assetService.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [AssetQueryKey.Assets],
        }),
    },
    ErrorCategoryToMessage,
  );
}
