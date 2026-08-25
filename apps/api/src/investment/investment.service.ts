import { Injectable, NotFoundException } from '@nestjs/common';
import { InvestmentModel } from '@repo/models';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InvestmentMapper } from './mappers/investment.mapper';
import { InvestmentRepository } from './investment.repository';

@Injectable()
export class InvestmentService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async findAll(): Promise<InvestmentModel[]> {
    const investments = await this.investmentRepository.findAll();
    return investments.map((investment) =>
      InvestmentMapper.toDomain(investment),
    );
  }

  async create(dto: CreateInvestmentDto): Promise<InvestmentModel> {
    const investment = await this.investmentRepository.create(
      InvestmentMapper.toCreateEntity(dto),
    );
    return InvestmentMapper.toDomain(investment);
  }

  async update(id: string, dto: UpdateInvestmentDto): Promise<InvestmentModel> {
    const investment = await this.investmentRepository.update(
      id,
      InvestmentMapper.toUpdateEntity(dto),
    );
    if (!investment) {
      throw new NotFoundException('Investment not found');
    }
    return InvestmentMapper.toDomain(investment);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.investmentRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Investment not found');
    }
  }
}
