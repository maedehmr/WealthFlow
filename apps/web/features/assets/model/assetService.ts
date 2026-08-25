import type {
  CreateAssetRequestModel,
  UpdateAssetRequestModel,
} from "@repo/models";
import { assetApi } from "@/features/assets/api/assetApi";
import { AssetItemModel } from "@/features/assets/model/assetModel";

export class AssetService {
  list(): Promise<AssetItemModel[]> {
    return assetApi.list();
  }

  create(data: CreateAssetRequestModel): Promise<AssetItemModel> {
    return assetApi.create(data);
  }

  update(id: string, data: UpdateAssetRequestModel): Promise<AssetItemModel> {
    return assetApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return assetApi.remove(id);
  }
}

export const assetService = new AssetService();
