import type { LoginRequestModel } from "@repo/models";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { authService } from "@/features/auth/model/authService";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";

export function useLogin() {
  return useApiMutation(
    {
      mutationFn: (request: LoginRequestModel) => authService.login(request),
    },
    ErrorCategoryToMessage,
  );
}
