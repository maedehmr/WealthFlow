import { IsEnum, IsOptional, IsString } from "class-validator";
import { BaseCreateTransactionRequestModel } from "../shared/baseCreateTransactionRequestModel";
import { DebtCategory } from "./debtCategory";

export class CreateDebtRequestModel extends BaseCreateTransactionRequestModel {
  @IsEnum(DebtCategory, { message: "دسته‌بندی نامعتبر است" })
  category!: DebtCategory;

  @IsOptional()
  @IsString({ message: "طلبکار باید متن باشد" })
  creditor?: string;
}
