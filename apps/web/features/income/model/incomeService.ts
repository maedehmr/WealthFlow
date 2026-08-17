import type {
  CreateIncomeRequestModel,
  IncomeModel,
  UpdateIncomeRequestModel,
} from "@repo/models";
import { incomeApi } from "@/features/income/api/incomeApi";

export class IncomeService {
  list(): Promise<IncomeModel[]> {
    return incomeApi.list();
  }

  create(data: CreateIncomeRequestModel): Promise<IncomeModel> {
    return incomeApi.create(data);
  }

  update(id: string, data: UpdateIncomeRequestModel): Promise<IncomeModel> {
    return incomeApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return incomeApi.remove(id);
  }
}

export const incomeService = new IncomeService();
