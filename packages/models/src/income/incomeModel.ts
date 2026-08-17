import { IncomeCategory } from "./incomeCategory";

export class IncomeModel {
  id!: string;
  name!: string;
  price!: number;
  source!: string;
  date!: number;
  category!: IncomeCategory;
  createdAt!: string;
  updatedAt!: string;
}
