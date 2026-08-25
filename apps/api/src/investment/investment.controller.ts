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
import { InvestmentModel } from '@repo/models';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InvestmentService } from './investment.service';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  findAll(): Promise<InvestmentModel[]> {
    return this.investmentService.findAll();
  }

  @Post()
  create(@Body() dto: CreateInvestmentDto): Promise<InvestmentModel> {
    return this.investmentService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInvestmentDto,
  ): Promise<InvestmentModel> {
    return this.investmentService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.investmentService.remove(id);
  }
}
