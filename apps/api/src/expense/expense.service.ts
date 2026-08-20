import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseModel } from '@repo/models';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseMapper } from './mappers/expense.mapper';
import { ExpenseRepository } from './expense.repository';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findAll(): Promise<ExpenseModel[]> {
    const expenses = await this.expenseRepository.findAll();
    return expenses.map((expense) => ExpenseMapper.toDomain(expense));
  }

  async create(dto: CreateExpenseDto): Promise<ExpenseModel> {
    const expense = await this.expenseRepository.create(
      ExpenseMapper.toCreateEntity(dto),
    );
    return ExpenseMapper.toDomain(expense);
  }

  async update(id: string, dto: UpdateExpenseDto): Promise<ExpenseModel> {
    const expense = await this.expenseRepository.update(
      id,
      ExpenseMapper.toUpdateEntity(dto),
    );
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return ExpenseMapper.toDomain(expense);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.expenseRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Expense not found');
    }
  }
}
