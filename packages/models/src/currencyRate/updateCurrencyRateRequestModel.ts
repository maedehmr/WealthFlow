import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateCurrencyRateRequestModel {
  @Type(() => Number)
  @IsNumber({}, { message: "نرخ باید عدد باشد" })
  @IsPositive({ message: "نرخ باید مثبت باشد" })
  rate!: number;

  @IsOptional()
  @IsString({ message: "منبع باید متن باشد" })
  source?: string;
}
