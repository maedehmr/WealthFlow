import type {
  CreateInvestmentRequestModel,
  UpdateInvestmentRequestModel,
} from "@repo/models";
import { investmentApi } from "@/features/investments/api/investmentApi";
import { InvestmentItemModel } from "@/features/investments/model/investmentModel";

export class InvestmentService {
  list(): Promise<InvestmentItemModel[]> {
    return investmentApi.list();
  }

  create(data: CreateInvestmentRequestModel): Promise<InvestmentItemModel> {
    return investmentApi.create(data);
  }

  update(
    id: string,
    data: UpdateInvestmentRequestModel,
  ): Promise<InvestmentItemModel> {
    return investmentApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return investmentApi.remove(id);
  }
}

export const investmentService = new InvestmentService();
