import { useQueryClient } from "@tanstack/react-query";
import type { UpdateAssetRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { assetService } from "@/features/assets/model/assetService";
import { AssetQueryKey } from "@/features/assets/model/assetConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

interface UpdateAssetVariables {
  id: string;
  data: UpdateAssetRequestModel;
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: ({ id, data }: UpdateAssetVariables) =>
        assetService.update(id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [AssetQueryKey.Assets],
        }),
    },
    ErrorCategoryToMessage,
  );
}
