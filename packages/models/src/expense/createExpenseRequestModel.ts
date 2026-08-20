import { IsEnum } from "class-validator";
import { BaseCreateTransactionRequestModel } from "../shared/baseCreateTransactionRequestModel";
import { ExpenseCategory } from "./expenseCategory";
import { PaymentMethod } from "./paymentMethod";

export class CreateExpenseRequestModel extends BaseCreateTransactionRequestModel {
  @IsEnum(ExpenseCategory, { message: "دسته‌بندی نامعتبر است" })
  category!: ExpenseCategory;

  @IsEnum(PaymentMethod, { message: "روش پرداخت نامعتبر است" })
  paymentMethod!: PaymentMethod;
}
