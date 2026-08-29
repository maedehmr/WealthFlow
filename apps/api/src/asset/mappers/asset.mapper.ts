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
      quantity: entity.quantity ?? undefined,
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
      quantity: dto.quantity ?? null,
    };
  }

  static toUpdateEntity(dto: UpdateAssetDto): Partial<Asset> {
    const { acquisitionDate, location, notes, quantity, ...rest } = dto;
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
    if (quantity !== undefined) {
      entity.quantity = quantity ?? null;
    }

    return entity;
  }
}
