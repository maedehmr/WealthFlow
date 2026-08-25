import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { DebtController } from './debt.controller';
import { DebtRepository } from './debt.repository';
import { DebtService } from './debt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  controllers: [DebtController],
  providers: [DebtService, DebtRepository],
})
export class DebtModule {}
