import { AssetModel } from '@repo/models';
import { Asset } from '../entities/asset.entity';
import { CreateAssetDto } from '../dto/create-asset.dto';
import { UpdateAssetDto } from '../dto/update-asset.dto';

export class AssetMapper {
  static toDomain(entity: Asset): AssetModel {
    return Object.assign(new AssetModel(), {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      value: entity.value,
      acquisitionDate: entity.acquisitionDate?.getTime() ?? undefined,
      location: entity.location ?? undefined,
      notes: entity.notes ?? undefined,
      valuationMode: entity.valuationMode,
      currencyCode: entity.currencyCode ?? undefined,
      foreignAmount: entity.foreignAmount ?? undefined,
      latestManualValue: entity.latestManualValue ?? undefined,
      manualValueUpdatedAt: entity.manualValueUpdatedAt?.getTime() ?? undefined,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  static toCreateEntity(dto: CreateAssetDto): Partial<Asset> {
    return {
      ...dto,
      acquisitionDate: dto.acquisitionDate
        ? new Date(dto.acquisitionDate)
        : null,
      location: dto.location ?? null,
      notes: dto.notes ?? null,
      currencyCode: dto.currencyCode ?? null,
      foreignAmount: dto.foreignAmount ?? null,
      latestManualValue: dto.latestManualValue ?? null,
      manualValueUpdatedAt:
        dto.latestManualValue !== undefined ? new Date() : null,
    };
  }

  static toUpdateEntity(dto: UpdateAssetDto): Partial<Asset> {
    const {
      acquisitionDate,
      location,
      notes,
      currencyCode,
      foreignAmount,
      latestManualValue,
      ...rest
    } = dto;
    const entity: Partial<Asset> = rest;

    if (acquisitionDate !== undefined) {
      entity.acquisitionDate = acquisitionDate
        ? new Date(acquisitionDate)
        : null;
    }
    if (location !== undefined) {
      entity.location = location ?? null;
    }
    if (notes !== undefined) {
      entity.notes = notes ?? null;
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
