import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  findAll(): Promise<Expense[]> {
    return this.repository.find({ order: { date: 'DESC' } });
  }

  findById(id: string): Promise<Expense | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Expense>): Promise<Expense> {
    return this.repository.save(this.repository.create(data));
  }

  async update(id: string, data: Partial<Expense>): Promise<Expense | null> {
    const expense = await this.findById(id);
    if (!expense) return null;
    return this.repository.save(this.repository.merge(expense, data));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
