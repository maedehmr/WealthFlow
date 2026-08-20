import { BaseTransactionModel } from "../shared/baseTransactionModel";
import { ExpenseCategory } from "./expenseCategory";
import { PaymentMethod } from "./paymentMethod";

export class ExpenseModel extends BaseTransactionModel {
  category!: ExpenseCategory;
  paymentMethod!: PaymentMethod;
}
