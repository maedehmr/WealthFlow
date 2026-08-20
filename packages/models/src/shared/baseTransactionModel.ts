import { RecurrenceRule } from "./recurrenceRule";

export abstract class BaseTransactionModel {
  id!: string;
  name!: string;
  price!: number;
  date!: number;
  isRecurring!: boolean;
  recurrenceRule?: RecurrenceRule;
  notes?: string;
  createdAt!: string;
  updatedAt!: string;
}
