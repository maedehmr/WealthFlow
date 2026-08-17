import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getErrorMessage, type ErrorMessageMap } from "@/shared/lib/utils";

export function useApiQuery<TData, TError = unknown>(
  options: UseQueryOptions<TData, TError>,
  errorCategoryMap: ErrorMessageMap,
) {
  const query = useQuery(options);

  return {
    ...query,
    errorMessage: query.error
      ? getErrorMessage(query.error, errorCategoryMap)
      : null,
  };
}
