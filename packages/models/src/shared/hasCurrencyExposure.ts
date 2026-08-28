export interface HasCurrencyExposure<TRateInput> {
  readonly totalCost: number;
  currentValue(rateInput: TRateInput): number;
  profitAmount(rateInput: TRateInput): number;
  profitPercentage(rateInput: TRateInput): number;
  isProfit(rateInput: TRateInput): boolean;
}
