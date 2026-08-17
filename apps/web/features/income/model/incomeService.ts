import type {
  CreateIncomeRequestModel,
  UpdateIncomeRequestModel,
} from "@repo/models";
import { incomeApi } from "@/features/income/api/incomeApi";
import { IncomeItemModel } from "@/features/income/model/incomeModel";

export class IncomeService {
  list(): Promise<IncomeItemModel[]> {
    return incomeApi.list();
  }

  create(data: CreateIncomeRequestModel): Promise<IncomeItemModel> {
    return incomeApi.create(data);
  }

  update(id: string, data: UpdateIncomeRequestModel): Promise<IncomeItemModel> {
    return incomeApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return incomeApi.remove(id);
  }
}

export const incomeService = new IncomeService();
