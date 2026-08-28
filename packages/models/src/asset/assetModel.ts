import { ValuationMode } from "../shared/valuationMode";
import {
  createValuationHandler,
  ValuationHandler,
} from "../shared/valuationHandlerFactory";
import { AssetCategory } from "./assetCategory";

export class AssetModel {
  id!: string;
  name!: string;
  category!: AssetCategory;
  value!: number;
  acquisitionDate?: number;
  location?: string;
  createdAt!: string;
  updatedAt!: string;
  notes?: string;
  valuationMode!: ValuationMode;
  currencyCode?: string;
  foreignAmount?: number;
  latestManualValue?: number;
  manualValueUpdatedAt?: number;

  get valuationHandler(): ValuationHandler {
    return createValuationHandler({
      valuationMode: this.valuationMode,
      purchasePrice: this.value,
      foreignAmount: this.foreignAmount,
      latestManualValue: this.latestManualValue,
    });
  }
}
