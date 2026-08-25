import { BaseTransactionModel } from "../shared/baseTransactionModel";
import { DebtCategory } from "./debtCategory";

export class DebtModel extends BaseTransactionModel {
  category!: DebtCategory;
  creditor?: string;
}
