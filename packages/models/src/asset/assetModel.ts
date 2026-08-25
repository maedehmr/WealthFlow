import { AssetCategory } from "./assetCategory";

export class AssetModel {
  id!: string;
  name!: string;
  category!: AssetCategory;
  value!: number;
  acquisitionDate?: number;
  location?: string;
  createdAt!: string;
  updatedAt!: string;
  notes?: string;
}
