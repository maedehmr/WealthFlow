import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from "class-validator";
import { ValuationMode } from "../shared/valuationMode";
import { AssetCategory } from "./assetCategory";

export class UpdateAssetRequestModel {
  @IsOptional()
  @IsString({ message: "نام باید متن باشد" })
  @IsNotEmpty({ message: "نام الزامی است" })
  name?: string;

  @IsOptional()
  @IsEnum(AssetCategory, { message: "دسته‌بندی نامعتبر است" })
  category?: AssetCategory;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "ارزش باید عدد باشد" })
  @IsPositive({ message: "ارزش باید مثبت باشد" })
  value?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "تاریخ تملک معتبر نیست" })
  @IsPositive({ message: "تاریخ تملک معتبر نیست" })
  acquisitionDate?: number;

  @IsOptional()
  @IsString({ message: "محل نگهداری باید متن باشد" })
  location?: string;

  @IsOptional()
  @IsString({ message: "یادداشت باید متن باشد" })
  notes?: string;

  @IsOptional()
  @IsEnum(ValuationMode, { message: "نوع ارزش‌گذاری نامعتبر است" })
  valuationMode?: ValuationMode;

  @ValidateIf((o) => o.valuationMode && o.valuationMode !== ValuationMode.Manual)
  @IsString({ message: "کد ارز باید متن باشد" })
  @IsNotEmpty({ message: "کد ارز الزامی است" })
  currencyCode?: string;

  @ValidateIf((o) => o.valuationMode === ValuationMode.CurrencyExposed)
  @Type(() => Number)
  @IsNumber({}, { message: "مقدار ارز باید عدد باشد" })
  @IsPositive({ message: "مقدار ارز باید مثبت باشد" })
  foreignAmount?: number;

  @ValidateIf((o) => o.valuationMode === ValuationMode.Manual)
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "ارزش فعلی باید عدد باشد" })
  @IsPositive({ message: "ارزش فعلی باید مثبت باشد" })
  latestManualValue?: number;
}
