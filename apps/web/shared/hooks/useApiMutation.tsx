import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getErrorMessage, type ErrorMessageMap } from "@/shared/lib/utils";

export function useApiMutation<TData, TVariables, TError = unknown>(
  options: UseMutationOptions<TData, TError, TVariables>,
  errorCategoryMap: ErrorMessageMap,
) {
  const mutation = useMutation(options);

  return {
    ...mutation,
    errorMessage: mutation.error
      ? getErrorMessage(mutation.error, errorCategoryMap)
      : null,
  };
}
