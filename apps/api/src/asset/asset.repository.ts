import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetRepository {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  findAll(): Promise<Asset[]> {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  findById(id: string): Promise<Asset | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Asset>): Promise<Asset> {
    return this.repository.save(this.repository.create(data));
  }

  async update(id: string, data: Partial<Asset>): Promise<Asset | null> {
    const asset = await this.findById(id);
    if (!asset) return null;
    return this.repository.save(this.repository.merge(asset, data));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
