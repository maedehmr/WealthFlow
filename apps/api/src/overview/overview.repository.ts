import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../asset/entities/asset.entity';
import { Debt } from '../debt/entities/debt.entity';
import { Expense } from '../expense/entities/expense.entity';
import { Income } from '../income/entities/income.entity';
import { Investment } from '../investment/entities/investment.entity';

export interface RawCategoryBreakdown {
  category: string;
  total: string;
}

export interface RawMonthlyBucket {
  month: string;
  total: string;
}

@Injectable()
export class OverviewRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async getTotalAssetValue(): Promise<number> {
    const raw = await this.assetRepository
      .createQueryBuilder('asset')
      .select('COALESCE(SUM(asset.value), 0)', 'total')
      .getRawOne<{ total: string }>();
    return Number(raw?.total ?? 0);
  }

  async getTotalInvestmentValue(): Promise<number> {
    const raw = await this.investmentRepository
      .createQueryBuilder('investment')
      .select(
        'COALESCE(SUM(investment.price * investment.quantity), 0)',
        'total',
      )
      .getRawOne<{ total: string }>();
    return Number(raw?.total ?? 0);
  }

  async getTotalDebtValue(): Promise<number> {
    const raw = await this.debtRepository
      .createQueryBuilder('debt')
      .select('COALESCE(SUM(debt.price), 0)', 'total')
      .getRawOne<{ total: string }>();
    return Number(raw?.total ?? 0);
  }

  async getMonthCashFlow(
    monthStart: Date,
    monthEnd: Date,
  ): Promise<{ income: number; expense: number }> {
    const [incomeRaw, expenseRaw] = await Promise.all([
      this.incomeRepository
        .createQueryBuilder('income')
        .select('COALESCE(SUM(income.price), 0)', 'total')
        .where('income.date >= :start AND income.date < :end', {
          start: monthStart,
          end: monthEnd,
        })
        .getRawOne<{ total: string }>(),
      this.expenseRepository
        .createQueryBuilder('expense')
        .select('COALESCE(SUM(expense.price), 0)', 'total')
        .where('expense.date >= :start AND expense.date < :end', {
          start: monthStart,
          end: monthEnd,
        })
        .getRawOne<{ total: string }>(),
    ]);
    return {
      income: Number(incomeRaw?.total ?? 0),
      expense: Number(expenseRaw?.total ?? 0),
    };
  }

  async getMonthlyIncomeTrend(since: Date): Promise<RawMonthlyBucket[]> {
    return this.incomeRepository
      .createQueryBuilder('income')
      .select("date_trunc('month', income.date)", 'month')
      .addSelect('COALESCE(SUM(income.price), 0)', 'total')
      .where('income.date >= :since', { since })
      .groupBy("date_trunc('month', income.date)")
      .orderBy("date_trunc('month', income.date)", 'ASC')
      .getRawMany<RawMonthlyBucket>();
  }

  async getMonthlyExpenseTrend(since: Date): Promise<RawMonthlyBucket[]> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .select("date_trunc('month', expense.date)", 'month')
      .addSelect('COALESCE(SUM(expense.price), 0)', 'total')
      .where('expense.date >= :since', { since })
      .groupBy("date_trunc('month', expense.date)")
      .orderBy("date_trunc('month', expense.date)", 'ASC')
      .getRawMany<RawMonthlyBucket>();
  }

  async getExpenseCategoryBreakdown(): Promise<RawCategoryBreakdown[]> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .select('expense.category', 'category')
      .addSelect('COALESCE(SUM(expense.price), 0)', 'total')
      .groupBy('expense.category')
      .orderBy('total', 'DESC')
      .getRawMany<RawCategoryBreakdown>();
  }

  async getIncomeCategoryBreakdown(): Promise<RawCategoryBreakdown[]> {
    return this.incomeRepository
      .createQueryBuilder('income')
      .select('income.category', 'category')
      .addSelect('COALESCE(SUM(income.price), 0)', 'total')
      .groupBy('income.category')
      .orderBy('total', 'DESC')
      .getRawMany<RawCategoryBreakdown>();
  }

  async getInvestmentCategoryBreakdown(): Promise<RawCategoryBreakdown[]> {
    return this.investmentRepository
      .createQueryBuilder('investment')
      .select('investment.category', 'category')
      .addSelect(
        'COALESCE(SUM(investment.price * investment.quantity), 0)',
        'total',
      )
      .groupBy('investment.category')
      .orderBy('total', 'DESC')
      .getRawMany<RawCategoryBreakdown>();
  }

  async getAssetCategoryBreakdown(): Promise<RawCategoryBreakdown[]> {
    return this.assetRepository
      .createQueryBuilder('asset')
      .select('asset.category', 'category')
      .addSelect('COALESCE(SUM(asset.value), 0)', 'total')
      .groupBy('asset.category')
      .orderBy('total', 'DESC')
      .getRawMany<RawCategoryBreakdown>();
  }

  async getDebtCategoryBreakdown(): Promise<RawCategoryBreakdown[]> {
    return this.debtRepository
      .createQueryBuilder('debt')
      .select('debt.category', 'category')
      .addSelect('COALESCE(SUM(debt.price), 0)', 'total')
      .groupBy('debt.category')
      .orderBy('total', 'DESC')
      .getRawMany<RawCategoryBreakdown>();
  }
}
