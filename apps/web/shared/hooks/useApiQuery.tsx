import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { ErrorMessageMap, getErrorMessage } from "@/shared/lib/errorMessage";

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
