import { BaseTransactionModel } from "../shared/baseTransactionModel";
import { IncomeCategory } from "./incomeCategory";

export class IncomeModel extends BaseTransactionModel {
  source!: string;
  category!: IncomeCategory;
}
