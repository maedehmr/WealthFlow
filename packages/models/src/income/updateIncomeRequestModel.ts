import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseUpdateTransactionRequestModel } from "../shared/baseUpdateTransactionRequestModel";
import { IncomeCategory } from "./incomeCategory";

export class UpdateIncomeRequestModel extends BaseUpdateTransactionRequestModel {
  @IsOptional()
  @IsString({ message: "منبع باید متن باشد" })
  @IsNotEmpty({ message: "منبع الزامی است" })
  source?: string;

  @IsOptional()
  @IsEnum(IncomeCategory, { message: "دسته‌بندی نامعتبر است" })
  category?: IncomeCategory;
}
