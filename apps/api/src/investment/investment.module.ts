import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { InvestmentController } from './investment.controller';
import { InvestmentRepository } from './investment.repository';
import { InvestmentService } from './investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [InvestmentController],
  providers: [InvestmentService, InvestmentRepository],
})
export class InvestmentModule {}
