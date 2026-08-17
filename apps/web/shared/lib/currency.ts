// open.er-api.com quote rates in Iranian Rial (IRR); prices in this app are
// entered and stored in Toman, and 1 Toman = 10 Rial. Frankfurter (ECB-based)
// does not publish an IRR rate, so a broader open-rate API is used instead.
export const RIAL_PER_TOMAN = 10;

interface ExchangeRateResponse {
  result: "success" | "error";
  rates: Record<string, number>;
}

export async function fetchTomanToUsdRate(): Promise<number> {
  const response = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }
  const data: ExchangeRateResponse = await response.json();
  if (data.result !== "success") {
    throw new Error("Failed to fetch exchange rate");
  }
  const rialsPerUsd = data.rates.IRR;
  return rialsPerUsd / RIAL_PER_TOMAN;
}
