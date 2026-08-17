import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeRepository {
  constructor(
    @InjectRepository(Income)
    private readonly repository: Repository<Income>,
  ) {}

  findAll(): Promise<Income[]> {
    return this.repository.find({ order: { date: 'DESC' } });
  }

  findById(id: string): Promise<Income | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Income>): Promise<Income> {
    return this.repository.save(this.repository.create(data));
  }

  async update(id: string, data: Partial<Income>): Promise<Income | null> {
    const income = await this.findById(id);
    if (!income) return null;
    return this.repository.save(this.repository.merge(income, data));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
