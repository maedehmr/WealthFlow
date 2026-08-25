import { IsEnum, IsOptional, IsString } from "class-validator";
import { BaseUpdateTransactionRequestModel } from "../shared/baseUpdateTransactionRequestModel";
import { DebtCategory } from "./debtCategory";

export class UpdateDebtRequestModel extends BaseUpdateTransactionRequestModel {
  @IsOptional()
  @IsEnum(DebtCategory, { message: "دسته‌بندی نامعتبر است" })
  category?: DebtCategory;

  @IsOptional()
  @IsString({ message: "طلبکار باید متن باشد" })
  creditor?: string;
}
