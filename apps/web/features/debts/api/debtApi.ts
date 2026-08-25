import type {
  CreateDebtRequestModel,
  DebtModel,
  UpdateDebtRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { DebtItemModel } from "@/features/debts/model/debtModel";

export interface DebtApi {
  list(): Promise<DebtItemModel[]>;
  create(data: CreateDebtRequestModel): Promise<DebtItemModel>;
  update(id: string, data: UpdateDebtRequestModel): Promise<DebtItemModel>;
  remove(id: string): Promise<void>;
}

class HttpDebtApi implements DebtApi {
  async list(): Promise<DebtItemModel[]> {
    const { data } = await httpClient.get<DebtModel[]>("/debt");
    return data.map(DebtItemModel.fromDebtModel);
  }

  async create(data: CreateDebtRequestModel): Promise<DebtItemModel> {
    const { data: debt } = await httpClient.post<DebtModel>("/debt", data);
    return DebtItemModel.fromDebtModel(debt);
  }

  async update(
    id: string,
    data: UpdateDebtRequestModel,
  ): Promise<DebtItemModel> {
    const { data: debt } = await httpClient.patch<DebtModel>(
      `/debt/${id}`,
      data,
    );
    return DebtItemModel.fromDebtModel(debt);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/debt/${id}`);
  }
}

export const debtApi: DebtApi = new HttpDebtApi();
