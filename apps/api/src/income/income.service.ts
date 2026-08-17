import { Injectable, NotFoundException } from '@nestjs/common';
import { IncomeModel } from '@repo/models';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeMapper } from './mappers/income.mapper';
import { IncomeRepository } from './income.repository';

@Injectable()
export class IncomeService {
  constructor(private readonly incomeRepository: IncomeRepository) {}

  async findAll(): Promise<IncomeModel[]> {
    const incomes = await this.incomeRepository.findAll();
    return incomes.map((income) => IncomeMapper.toDomain(income));
  }

  async create(dto: CreateIncomeDto): Promise<IncomeModel> {
    const income = await this.incomeRepository.create(
      IncomeMapper.toCreateEntity(dto),
    );
    return IncomeMapper.toDomain(income);
  }

  async update(id: string, dto: UpdateIncomeDto): Promise<IncomeModel> {
    const income = await this.incomeRepository.update(
      id,
      IncomeMapper.toUpdateEntity(dto),
    );
    if (!income) {
      throw new NotFoundException('Income not found');
    }
    return IncomeMapper.toDomain(income);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.incomeRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Income not found');
    }
  }
}
