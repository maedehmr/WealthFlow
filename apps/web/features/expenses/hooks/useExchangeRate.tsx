import { useQuery } from "@tanstack/react-query";
import { fetchTomanToUsdRate } from "@/shared/lib/currency";

export function useExchangeRate() {
  return useQuery({
    queryKey: ["exchangeRate", "USD", "TOMAN"],
    queryFn: fetchTomanToUsdRate,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
}
