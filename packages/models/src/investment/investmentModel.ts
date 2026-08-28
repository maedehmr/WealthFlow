import { RecurrenceRule } from "../shared/recurrenceRule";
import { ValuationMode } from "../shared/valuationMode";
import {
  createValuationHandler,
  ValuationHandler,
} from "../shared/valuationHandlerFactory";
import { InvestmentCategory } from "./investmentCategory";

export class InvestmentModel {
  id!: string;
  name!: string;
  category!: InvestmentCategory;
  price!: number;
  purchaseDate!: number;
  broker?: string;
  isRecurring!: boolean;
  recurrenceRule?: RecurrenceRule;
  createdAt!: string;
  updatedAt!: string;
  notes?: string;
  valuationMode!: ValuationMode;
  quantity!: number;
  currencyCode?: string;
  foreignAmount?: number;
  latestManualValue?: number;
  manualValueUpdatedAt?: number;

  get valuationHandler(): ValuationHandler {
    return createValuationHandler({
      valuationMode: this.valuationMode,
      purchasePrice: this.price,
      foreignAmount: this.foreignAmount,
      latestManualValue: this.latestManualValue,
    });
  }
}
