import type {
  AssetModel,
  CreateAssetRequestModel,
  UpdateAssetRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { AssetItemModel } from "@/features/assets/model/assetModel";

export interface AssetApi {
  list(): Promise<AssetItemModel[]>;
  create(data: CreateAssetRequestModel): Promise<AssetItemModel>;
  update(id: string, data: UpdateAssetRequestModel): Promise<AssetItemModel>;
  remove(id: string): Promise<void>;
}

class HttpAssetApi implements AssetApi {
  async list(): Promise<AssetItemModel[]> {
    const { data } = await httpClient.get<AssetModel[]>("/asset");
    return data.map(AssetItemModel.fromAssetModel);
  }

  async create(data: CreateAssetRequestModel): Promise<AssetItemModel> {
    const { data: asset } = await httpClient.post<AssetModel>("/asset", data);
    return AssetItemModel.fromAssetModel(asset);
  }

  async update(
    id: string,
    data: UpdateAssetRequestModel,
  ): Promise<AssetItemModel> {
    const { data: asset } = await httpClient.patch<AssetModel>(
      `/asset/${id}`,
      data,
    );
    return AssetItemModel.fromAssetModel(asset);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/asset/${id}`);
  }
}

export const assetApi: AssetApi = new HttpAssetApi();
