import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentRepository {
  constructor(
    @InjectRepository(Investment)
    private readonly repository: Repository<Investment>,
  ) {}

  findAll(): Promise<Investment[]> {
    return this.repository.find({ order: { purchaseDate: 'DESC' } });
  }

  findById(id: string): Promise<Investment | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Investment>): Promise<Investment> {
    return this.repository.save(this.repository.create(data));
  }

  async update(
    id: string,
    data: Partial<Investment>,
  ): Promise<Investment | null> {
    const investment = await this.findById(id);
    if (!investment) return null;
    return this.repository.save(this.repository.merge(investment, data));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
