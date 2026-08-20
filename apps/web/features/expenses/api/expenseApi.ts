import type {
  CreateExpenseRequestModel,
  ExpenseModel,
  UpdateExpenseRequestModel,
} from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { ExpenseItemModel } from "@/features/expenses/model/expenseModel";

export interface ExpenseApi {
  list(): Promise<ExpenseItemModel[]>;
  create(data: CreateExpenseRequestModel): Promise<ExpenseItemModel>;
  update(
    id: string,
    data: UpdateExpenseRequestModel,
  ): Promise<ExpenseItemModel>;
  remove(id: string): Promise<void>;
}

class HttpExpenseApi implements ExpenseApi {
  async list(): Promise<ExpenseItemModel[]> {
    const { data } = await httpClient.get<ExpenseModel[]>("/expense");
    return data.map(ExpenseItemModel.fromExpenseModel);
  }

  async create(data: CreateExpenseRequestModel): Promise<ExpenseItemModel> {
    const { data: expense } = await httpClient.post<ExpenseModel>(
      "/expense",
      data,
    );
    return ExpenseItemModel.fromExpenseModel(expense);
  }

  async update(
    id: string,
    data: UpdateExpenseRequestModel,
  ): Promise<ExpenseItemModel> {
    const { data: expense } = await httpClient.patch<ExpenseModel>(
      `/expense/${id}`,
      data,
    );
    return ExpenseItemModel.fromExpenseModel(expense);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/expense/${id}`);
  }
}

export const expenseApi: ExpenseApi = new HttpExpenseApi();
