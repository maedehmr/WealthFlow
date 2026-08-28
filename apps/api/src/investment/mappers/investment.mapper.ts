import { InvestmentModel } from '@repo/models';
import { Investment } from '../entities/investment.entity';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { UpdateInvestmentDto } from '../dto/update-investment.dto';

export class InvestmentMapper {
  static toDomain(entity: Investment): InvestmentModel {
    return Object.assign(new InvestmentModel(), {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      price: entity.price,
      purchaseDate: entity.purchaseDate.getTime(),
      broker: entity.broker ?? undefined,
      isRecurring: entity.isRecurring,
      recurrenceRule: entity.recurrenceRule ?? undefined,
      notes: entity.notes ?? undefined,
      valuationMode: entity.valuationMode,
      quantity: entity.quantity,
      currencyCode: entity.currencyCode ?? undefined,
      foreignAmount: entity.foreignAmount ?? undefined,
      latestManualValue: entity.latestManualValue ?? undefined,
      manualValueUpdatedAt: entity.manualValueUpdatedAt?.getTime() ?? undefined,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  static toCreateEntity(dto: CreateInvestmentDto): Partial<Investment> {
    return {
      ...dto,
      purchaseDate: new Date(dto.purchaseDate),
      broker: dto.broker ?? null,
      recurrenceRule: dto.isRecurring ? (dto.recurrenceRule ?? null) : null,
      notes: dto.notes ?? null,
      currencyCode: dto.currencyCode ?? null,
      foreignAmount: dto.foreignAmount ?? null,
      latestManualValue: dto.latestManualValue ?? null,
      manualValueUpdatedAt:
        dto.latestManualValue !== undefined ? new Date() : null,
    };
  }

  static toUpdateEntity(dto: UpdateInvestmentDto): Partial<Investment> {
    const {
      purchaseDate,
      isRecurring,
      recurrenceRule,
      notes,
      broker,
      currencyCode,
      foreignAmount,
      latestManualValue,
      ...rest
    } = dto;
    const entity: Partial<Investment> = rest;

    if (purchaseDate !== undefined) {
      entity.purchaseDate = new Date(purchaseDate);
    }
    if (broker !== undefined) {
      entity.broker = broker ?? null;
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
    if (currencyCode !== undefined) {
      entity.currencyCode = currencyCode ?? null;
    }
    if (foreignAmount !== undefined) {
      entity.foreignAmount = foreignAmount;
    }
    if (latestManualValue !== undefined) {
      entity.latestManualValue = latestManualValue;
      entity.manualValueUpdatedAt = new Date();
    }

    return entity;
  }
}
