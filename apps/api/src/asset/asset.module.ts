import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetController } from './asset.controller';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [AssetController],
  providers: [AssetService, AssetRepository],
})
export class AssetModule {}
