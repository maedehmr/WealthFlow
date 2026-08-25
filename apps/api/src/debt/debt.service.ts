import { Injectable, NotFoundException } from '@nestjs/common';
import { DebtModel } from '@repo/models';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtMapper } from './mappers/debt.mapper';
import { DebtRepository } from './debt.repository';

@Injectable()
export class DebtService {
  constructor(private readonly debtRepository: DebtRepository) {}

  async findAll(): Promise<DebtModel[]> {
    const debts = await this.debtRepository.findAll();
    return debts.map((debt) => DebtMapper.toDomain(debt));
  }

  async create(dto: CreateDebtDto): Promise<DebtModel> {
    const debt = await this.debtRepository.create(
      DebtMapper.toCreateEntity(dto),
    );
    return DebtMapper.toDomain(debt);
  }

  async update(id: string, dto: UpdateDebtDto): Promise<DebtModel> {
    const debt = await this.debtRepository.update(
      id,
      DebtMapper.toUpdateEntity(dto),
    );
    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    return DebtMapper.toDomain(debt);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.debtRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Debt not found');
    }
  }
}
