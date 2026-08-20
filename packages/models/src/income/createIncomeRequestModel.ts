import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseCreateTransactionRequestModel } from "../shared/baseCreateTransactionRequestModel";
import { IncomeCategory } from "./incomeCategory";

export class CreateIncomeRequestModel extends BaseCreateTransactionRequestModel {
  @IsString({ message: "منبع باید متن باشد" })
  @IsNotEmpty({ message: "منبع الزامی است" })
  source!: string;

  @IsEnum(IncomeCategory, { message: "دسته‌بندی نامعتبر است" })
  category!: IncomeCategory;
}
