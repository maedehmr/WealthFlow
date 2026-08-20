import { ExpenseModel } from '@repo/models';
import { Expense } from '../entities/expense.entity';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';

export class ExpenseMapper {
  static toDomain(entity: Expense): ExpenseModel {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      category: entity.category,
      date: entity.date.getTime(),
      isRecurring: entity.isRecurring,
      recurrenceRule: entity.recurrenceRule ?? undefined,
      paymentMethod: entity.paymentMethod,
      notes: entity.notes ?? undefined,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  static toCreateEntity(dto: CreateExpenseDto): Partial<Expense> {
    return {
      ...dto,
      date: new Date(dto.date),
      recurrenceRule: dto.isRecurring ? (dto.recurrenceRule ?? null) : null,
      notes: dto.notes ?? null,
    };
  }

  static toUpdateEntity(dto: UpdateExpenseDto): Partial<Expense> {
    const { date, isRecurring, recurrenceRule, notes, ...rest } = dto;
    const entity: Partial<Expense> = rest;

    if (date !== undefined) {
      entity.date = new Date(date);
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
