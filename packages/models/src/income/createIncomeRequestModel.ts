import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";
import { IncomeCategory } from "./incomeCategory";

export class CreateIncomeRequestModel {
  @IsString({ message: "نام باید متن باشد" })
  @IsNotEmpty({ message: "نام الزامی است" })
  name!: string;

  @Type(() => Number)
  @IsNumber({}, { message: "قیمت باید عدد باشد" })
  @IsPositive({ message: "قیمت باید مثبت باشد" })
  price!: number;

  @IsString({ message: "منبع باید متن باشد" })
  @IsNotEmpty({ message: "منبع الزامی است" })
  source!: string;

  @Type(() => Number)
  @IsNumber({}, { message: "تاریخ معتبر نیست" })
  @IsPositive({ message: "تاریخ معتبر نیست" })
  date!: number;

  @IsEnum(IncomeCategory, { message: "دسته‌بندی نامعتبر است" })
  category!: IncomeCategory;
}
