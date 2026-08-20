import type {
  CreateExpenseRequestModel,
  UpdateExpenseRequestModel,
} from "@repo/models";
import { expenseApi } from "@/features/expenses/api/expenseApi";
import { ExpenseItemModel } from "@/features/expenses/model/expenseModel";

export class ExpenseService {
  list(): Promise<ExpenseItemModel[]> {
    return expenseApi.list();
  }

  create(data: CreateExpenseRequestModel): Promise<ExpenseItemModel> {
    return expenseApi.create(data);
  }

  update(
    id: string,
    data: UpdateExpenseRequestModel,
  ): Promise<ExpenseItemModel> {
    return expenseApi.update(id, data);
  }

  remove(id: string): Promise<void> {
    return expenseApi.remove(id);
  }
}

export const expenseService = new ExpenseService();
