import { RecurrenceRule } from "../shared/recurrenceRule";
import { InvestmentCategory } from "./investmentCategory";

export class InvestmentModel {
  id!: string;
  name!: string;
  category!: InvestmentCategory;
  price!: number;
  quantity!: number;
  purchaseDate!: number;
  broker?: string;
  isRecurring!: boolean;
  recurrenceRule?: RecurrenceRule;
  createdAt!: string;
  updatedAt!: string;
  notes?: string;
}
