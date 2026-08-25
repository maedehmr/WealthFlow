import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { assetService } from "@/features/assets/model/assetService";
import { AssetQueryKey } from "@/features/assets/model/assetConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useApiMutation(
    {
      mutationFn: (id: string) => assetService.remove(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [AssetQueryKey.Assets],
        }),
    },
    ErrorCategoryToMessage,
  );
}
