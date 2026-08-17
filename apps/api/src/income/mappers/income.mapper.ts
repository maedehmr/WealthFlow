import { IncomeModel } from '@repo/models';
import { Income } from '../entities/income.entity';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { UpdateIncomeDto } from '../dto/update-income.dto';

export class IncomeMapper {
  static toDomain(entity: Income): IncomeModel {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      source: entity.source,
      date: entity.date.getTime(),
      category: entity.category,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  static toCreateEntity(dto: CreateIncomeDto): Partial<Income> {
    return { ...dto, date: new Date(dto.date) };
  }

  static toUpdateEntity(dto: UpdateIncomeDto): Partial<Income> {
    const { date, ...rest } = dto;
    const entity: Partial<Income> = rest;
    if (date !== undefined) {
      entity.date = new Date(date);
    }
    return entity;
  }
}
