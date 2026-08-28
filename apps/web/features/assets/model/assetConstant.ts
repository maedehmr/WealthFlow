import { AssetCategory, ValuationMode } from "@repo/models";

export const AssetCategoryLabel: Record<AssetCategory, string> = {
  [AssetCategory.Cash]: "نقد",
  [AssetCategory.BankAccount]: "حساب بانکی",
  [AssetCategory.RealEstate]: "املاک",
  [AssetCategory.Vehicle]: "خودرو",
  [AssetCategory.Jewelry]: "جواهرات",
  [AssetCategory.Equipment]: "تجهیزات",
  [AssetCategory.Other]: "سایر",
};

export const ValuationModeLabel: Record<ValuationMode, string> = {
  [ValuationMode.CurrencyExposed]: "پول نقد ارزی",
  [ValuationMode.Manual]: "دستی",
};

export enum AssetQueryKey {
  Assets = "assets",
}
