import { ValuationMode } from "./valuationMode";
import { CurrencyExposedModel } from "./currencyExposedModel";
import { ManualValuationModel } from "./manualValuationModel";

export type ValuationHandler = CurrencyExposedModel | ManualValuationModel;

export interface ValuationHandlerInput {
  valuationMode: ValuationMode;
  purchasePrice: number;
  foreignAmount?: number | null;
  latestManualValue?: number | null;
}

export function createValuationHandler(
  input: ValuationHandlerInput,
): ValuationHandler {
  switch (input.valuationMode) {
    case ValuationMode.CurrencyExposed:
      return new CurrencyExposedModel(
        input.purchasePrice,
        input.foreignAmount ?? 0,
      );
    case ValuationMode.Manual:
    default:
      return new ManualValuationModel(
        input.purchasePrice,
        input.latestManualValue ?? null,
      );
  }
}
