import { HasCurrencyExposure } from "./hasCurrencyExposure";

export class CurrencyExposedModel implements HasCurrencyExposure<number> {
  constructor(
    private purchasePrice: number,
    private foreignAmount: number,
  ) {}

  get totalCost(): number {
    return this.purchasePrice * this.foreignAmount;
  }

  currentValue(rate: number): number {
    return rate * this.foreignAmount;
  }

  profitAmount(rate: number): number {
    return this.currentValue(rate) - this.totalCost;
  }

  profitPercentage(rate: number): number {
    return this.totalCost === 0
      ? 0
      : (this.profitAmount(rate) / this.totalCost) * 100;
  }

  isProfit(rate: number): boolean {
    return this.profitAmount(rate) >= 0;
  }
}
