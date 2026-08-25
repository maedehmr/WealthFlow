import type {
  CreateDebtRequestModel,
  UpdateDebtRequestModel,
} from "@repo/models";
import { debtApi } from "@/features/debts/api/debtApi";
import { DebtItemModel } from "@/features/debts/model/debtModel";

export class DebtService {
  list(): Promise<DebtItemModel[]> {
    return debtApi.list();
  }

  create(data: CreateDebtRequestModel): Promise<DebtItemModel> {
    return debtApi.create(data);
  }

  update(id: string, data: UpdateDebtRequestModel): Promise<DebtItemModel> {
    return debtApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return debtApi.remove(id);
  }
}

export const debtService = new DebtService();
