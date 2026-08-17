import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IncomeModel } from '@repo/models';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  findAll(): Promise<IncomeModel[]> {
    return this.incomeService.findAll();
  }

  @Post()
  create(@Body() dto: CreateIncomeDto): Promise<IncomeModel> {
    return this.incomeService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIncomeDto,
  ): Promise<IncomeModel> {
    return this.incomeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.incomeService.remove(id);
  }
}
