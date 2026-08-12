import { useMutation } from "@tanstack/react-query";
import type { LoginRequestModel } from "@repo/models";
import { authService } from "@/features/auth/model/authService";
import { getErrorMessage } from "@/shared/lib/utils";
import { AuthCategoryToMessage } from "@/features/auth/model/authConstant";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (request: LoginRequestModel) => authService.login(request),
  });

  return {
    ...mutation,
    errorMessage: mutation.error
      ? getErrorMessage(mutation.error, AuthCategoryToMessage)
      : null,
  };
}
