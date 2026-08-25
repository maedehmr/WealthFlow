import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './entities/debt.entity';

@Injectable()
export class DebtRepository {
  constructor(
    @InjectRepository(Debt)
    private readonly repository: Repository<Debt>,
  ) {}

  findAll(): Promise<Debt[]> {
    return this.repository.find({ order: { date: 'DESC' } });
  }

  findById(id: string): Promise<Debt | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Debt>): Promise<Debt> {
    return this.repository.save(this.repository.create(data));
  }

  async update(id: string, data: Partial<Debt>): Promise<Debt | null> {
    const debt = await this.findById(id);
    if (!debt) return null;
    return this.repository.save(this.repository.merge(debt, data));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
