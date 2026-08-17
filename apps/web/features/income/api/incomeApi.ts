import type {
  CreateIncomeRequestModel,
  IncomeModel,
  UpdateIncomeRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";

export interface IncomeApi {
  list(): Promise<IncomeModel[]>;
  create(data: CreateIncomeRequestModel): Promise<IncomeModel>;
  update(id: string, data: UpdateIncomeRequestModel): Promise<IncomeModel>;
  remove(id: string): Promise<void>;
}

class HttpIncomeApi implements IncomeApi {
  async list(): Promise<IncomeModel[]> {
    const { data } = await httpClient.get<IncomeModel[]>("/income");
    return data;
  }

  async create(data: CreateIncomeRequestModel): Promise<IncomeModel> {
    const { data: income } = await httpClient.post<IncomeModel>(
      "/income",
      data
    );
    return income;
  }

  async update(
    id: string,
    data: UpdateIncomeRequestModel
  ): Promise<IncomeModel> {
    const { data: income } = await httpClient.patch<IncomeModel>(
      `/income/${id}`,
      data
    );
    return income;
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/income/${id}`);
  }
}

export const incomeApi: IncomeApi = new HttpIncomeApi();
