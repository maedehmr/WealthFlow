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
import { RecurrenceRule } from "./recurrenceRule";

export abstract class BaseUpdateTransactionRequestModel {
  @IsOptional()
  @IsString({ message: "نام باید متن باشد" })
  @IsNotEmpty({ message: "نام الزامی است" })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "قیمت باید عدد باشد" })
  @IsPositive({ message: "قیمت باید مثبت باشد" })
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "تاریخ معتبر نیست" })
  @IsPositive({ message: "تاریخ معتبر نیست" })
  date?: number;

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
