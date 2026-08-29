export const RATE_CODE_USD = "USD";
export const RATE_CODE_GOLD_18K = "GOLD18";

// Gold & Dollar share the same enum string values across Investment/Asset,
// so one mapping serves both.
export function rateCodeForCategory(category: string): string | null {
  if (category === "gold") return RATE_CODE_GOLD_18K;
  if (category === "dollar") return RATE_CODE_USD;
  return null;
}
