import { IsEnum, IsOptional } from "class-validator";
import { BaseUpdateTransactionRequestModel } from "../shared/baseUpdateTransactionRequestModel";
import { ExpenseCategory } from "./expenseCategory";
import { PaymentMethod } from "./paymentMethod";

export class UpdateExpenseRequestModel extends BaseUpdateTransactionRequestModel {
  @IsOptional()
  @IsEnum(ExpenseCategory, { message: "دسته‌بندی نامعتبر است" })
  category?: ExpenseCategory;

  @IsOptional()
  @IsEnum(PaymentMethod, { message: "روش پرداخت نامعتبر است" })
  paymentMethod?: PaymentMethod;
}
