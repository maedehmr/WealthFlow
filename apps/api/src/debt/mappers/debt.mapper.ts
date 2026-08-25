import { DebtModel } from '@repo/models';
import { Debt } from '../entities/debt.entity';
import { CreateDebtDto } from '../dto/create-debt.dto';
import { UpdateDebtDto } from '../dto/update-debt.dto';

export class DebtMapper {
  static toDomain(entity: Debt): DebtModel {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      category: entity.category,
      date: entity.date.getTime(),
      isRecurring: entity.isRecurring,
      recurrenceRule: entity.recurrenceRule ?? undefined,
      creditor: entity.creditor ?? undefined,
      notes: entity.notes ?? undefined,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  static toCreateEntity(dto: CreateDebtDto): Partial<Debt> {
    return {
      ...dto,
      date: new Date(dto.date),
      recurrenceRule: dto.isRecurring ? (dto.recurrenceRule ?? null) : null,
      creditor: dto.creditor ?? null,
      notes: dto.notes ?? null,
    };
  }

  static toUpdateEntity(dto: UpdateDebtDto): Partial<Debt> {
    const { date, isRecurring, recurrenceRule, creditor, notes, ...rest } = dto;
    const entity: Partial<Debt> = rest;

    if (date !== undefined) {
      entity.date = new Date(date);
    }
    if (creditor !== undefined) {
      entity.creditor = creditor ?? null;
    }
    if (notes !== undefined) {
      entity.notes = notes ?? null;
    }
    if (isRecurring !== undefined) {
      entity.isRecurring = isRecurring;
      entity.recurrenceRule = isRecurring ? (recurrenceRule ?? null) : null;
    } else if (recurrenceRule !== undefined) {
      entity.recurrenceRule = recurrenceRule;
    }

    return entity;
  }
}
