import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetModel } from '@repo/models';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetMapper } from './mappers/asset.mapper';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async findAll(): Promise<AssetModel[]> {
    const assets = await this.assetRepository.findAll();
    return assets.map((asset) => AssetMapper.toDomain(asset));
  }

  async create(dto: CreateAssetDto): Promise<AssetModel> {
    const asset = await this.assetRepository.create(
      AssetMapper.toCreateEntity(dto),
    );
    return AssetMapper.toDomain(asset);
  }

  async update(id: string, dto: UpdateAssetDto): Promise<AssetModel> {
    const asset = await this.assetRepository.update(
      id,
      AssetMapper.toUpdateEntity(dto),
    );
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    return AssetMapper.toDomain(asset);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.assetRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Asset not found');
    }
  }
}
