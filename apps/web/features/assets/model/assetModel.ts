import { AssetModel } from "@repo/models";
import { formatJalaliDate, formatToman, formatUsd } from "@/shared/lib/format";
import { AssetCategoryLabel } from "@/features/assets/model/assetConstant";

export class AssetItemModel extends AssetModel {
  get formatValue(): string {
    return `${formatToman(this.value)} تومان`;
  }

  get formatAcquisitionDate(): string {
    return this.acquisitionDate ? formatJalaliDate(this.acquisitionDate) : "—";
  }

  get categoryLabel(): string {
    return AssetCategoryLabel[this.category];
  }

  formatValueUsd(tomanPerUsdRate?: number): string {
    return tomanPerUsdRate ? formatUsd(this.value / tomanPerUsdRate) : "—";
  }

  static fromAssetModel(asset: AssetModel): AssetItemModel {
    const assetItem = new AssetItemModel();

    assetItem.id = asset.id;
    assetItem.name = asset.name;
    assetItem.category = asset.category;
    assetItem.value = asset.value;
    assetItem.acquisitionDate = asset.acquisitionDate;
    assetItem.location = asset.location;
    assetItem.notes = asset.notes;
    assetItem.createdAt = asset.createdAt;
    assetItem.updatedAt = asset.updatedAt;

    return assetItem;
  }
}
