export class ManualValuationModel {
  constructor(
    private purchasePrice: number,
    private latestManualValue: number | null,
  ) {}

  get totalCost(): number {
    return this.purchasePrice;
  }

  get currentValue(): number | null {
    return this.latestManualValue;
  }

  get profitAmount(): number | null {
    return this.latestManualValue === null
      ? null
      : this.latestManualValue - this.purchasePrice;
  }

  get isProfit(): boolean | null {
    return this.profitAmount === null ? null : this.profitAmount >= 0;
  }
}
