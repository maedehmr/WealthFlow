import { RecurrenceRule } from "../shared/recurrenceRule";
import { CurrencyExposedModel } from "../shared/currencyExposedModel";
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
  quantity!: number;

  get valuationHandler(): CurrencyExposedModel {
    return new CurrencyExposedModel(this.price, this.quantity);
  }
}
