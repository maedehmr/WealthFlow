import type {
  CreateIncomeRequestModel,
  IncomeModel,
  UpdateIncomeRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { IncomeItemModel } from "@/features/income/model/incomeModel";

export interface IncomeApi {
  list(): Promise<IncomeItemModel[]>;
  create(data: CreateIncomeRequestModel): Promise<IncomeItemModel>;
  update(id: string, data: UpdateIncomeRequestModel): Promise<IncomeItemModel>;
  remove(id: string): Promise<void>;
}

class HttpIncomeApi implements IncomeApi {
  async list(): Promise<IncomeItemModel[]> {
    const { data } = await httpClient.get<IncomeModel[]>("/income");
    return data.map(IncomeItemModel.fromIncomeModel);
  }

  async create(data: CreateIncomeRequestModel): Promise<IncomeItemModel> {
    const { data: income } = await httpClient.post<IncomeModel>(
      "/income",
      data,
    );
    return IncomeItemModel.fromIncomeModel(income);
  }

  async update(
    id: string,
    data: UpdateIncomeRequestModel,
  ): Promise<IncomeItemModel> {
    const { data: income } = await httpClient.patch<IncomeModel>(
      `/income/${id}`,
      data,
    );
    return IncomeItemModel.fromIncomeModel(income);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/income/${id}`);
  }
}

export const incomeApi: IncomeApi = new HttpIncomeApi();
