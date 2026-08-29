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

  @ValidateIf(
    (o) =>
      o.category === AssetCategory.Gold || o.category === AssetCategory.Dollar,
  )
  @Type(() => Number)
  @IsNumber({}, { message: "مقدار باید عدد باشد" })
  @IsPositive({ message: "مقدار باید مثبت باشد" })
  quantity?: number;
}
