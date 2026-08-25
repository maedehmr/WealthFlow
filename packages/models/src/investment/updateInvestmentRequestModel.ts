import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from "class-validator";
import { RecurrenceRule } from "../shared/recurrenceRule";
import { InvestmentCategory } from "./investmentCategory";

export class UpdateInvestmentRequestModel {
  @IsOptional()
  @IsString({ message: "نام باید متن باشد" })
  @IsNotEmpty({ message: "نام الزامی است" })
  name?: string;

  @IsOptional()
  @IsEnum(InvestmentCategory, { message: "دسته‌بندی نامعتبر است" })
  category?: InvestmentCategory;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "قیمت باید عدد باشد" })
  @IsPositive({ message: "قیمت باید مثبت باشد" })
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "تعداد باید عدد باشد" })
  @IsPositive({ message: "تعداد باید مثبت باشد" })
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "تاریخ خرید معتبر نیست" })
  @IsPositive({ message: "تاریخ خرید معتبر نیست" })
  purchaseDate?: number;

  @IsOptional()
  @IsString({ message: "کارگزاری باید متن باشد" })
  broker?: string;

  @IsOptional()
  @IsBoolean({ message: "وضعیت تکرار باید مشخص شود" })
  isRecurring?: boolean;

  @ValidateIf((o) => o.isRecurring === true)
  @IsEnum(RecurrenceRule, { message: "دوره تکرار نامعتبر است" })
  recurrenceRule?: RecurrenceRule;

  @IsOptional()
  @IsString({ message: "یادداشت باید متن باشد" })
  notes?: string;
}
