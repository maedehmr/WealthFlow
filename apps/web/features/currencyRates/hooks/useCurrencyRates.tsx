import { useMemo } from "react";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { currencyRateService } from "@/features/currencyRates/model/currencyRateService";
import { CurrencyRateQueryKey } from "@/features/currencyRates/model/currencyRateConstant";
import { ErrorCategoryToMessage } from "@/shared/constants/errorMessage";
import { CurrencyRateItemModel } from "@/features/currencyRates/model/currencyRateModel";

export function useCurrencyRates() {
  const query = useApiQuery(
    {
      queryKey: [CurrencyRateQueryKey.CurrencyRates],
      queryFn: () => currencyRateService.list(),
    },
    ErrorCategoryToMessage,
  );

  const ratesByCode = useMemo(
    () =>
      new Map<string, CurrencyRateItemModel>(
        (query.data ?? []).map((rate) => [rate.code, rate]),
      ),
    [query.data],
  );

  return { ...query, ratesByCode };
}
