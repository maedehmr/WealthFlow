import type {
  CreateInvestmentRequestModel,
  InvestmentModel,
  UpdateInvestmentRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { InvestmentItemModel } from "@/features/investments/model/investmentModel";

export interface InvestmentApi {
  list(): Promise<InvestmentItemModel[]>;
  create(data: CreateInvestmentRequestModel): Promise<InvestmentItemModel>;
  update(
    id: string,
    data: UpdateInvestmentRequestModel,
  ): Promise<InvestmentItemModel>;
  remove(id: string): Promise<void>;
}

class HttpInvestmentApi implements InvestmentApi {
  async list(): Promise<InvestmentItemModel[]> {
    const { data } = await httpClient.get<InvestmentModel[]>("/investment");
    return data.map(InvestmentItemModel.fromInvestmentModel);
  }

  async create(
    data: CreateInvestmentRequestModel,
  ): Promise<InvestmentItemModel> {
    const { data: investment } = await httpClient.post<InvestmentModel>(
      "/investment",
      data,
    );
    return InvestmentItemModel.fromInvestmentModel(investment);
  }

  async update(
    id: string,
    data: UpdateInvestmentRequestModel,
  ): Promise<InvestmentItemModel> {
    const { data: investment } = await httpClient.patch<InvestmentModel>(
      `/investment/${id}`,
      data,
    );
    return InvestmentItemModel.fromInvestmentModel(investment);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/investment/${id}`);
  }
}

export const investmentApi: InvestmentApi = new HttpInvestmentApi();
