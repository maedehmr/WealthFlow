import { AssetCategory } from "@repo/models";

export const AssetCategoryLabel: Record<AssetCategory, string> = {
  [AssetCategory.Cash]: "نقد",
  [AssetCategory.BankAccount]: "حساب بانکی",
  [AssetCategory.RealEstate]: "املاک",
  [AssetCategory.Vehicle]: "خودرو",
  [AssetCategory.Jewelry]: "جواهرات",
  [AssetCategory.Equipment]: "تجهیزات",
  [AssetCategory.Gold]: "طلا",
  [AssetCategory.Dollar]: "دلار",
  [AssetCategory.Other]: "سایر",
};

export enum AssetQueryKey {
  Assets = "assets",
}
