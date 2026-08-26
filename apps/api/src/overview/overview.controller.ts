import { Controller, Get } from '@nestjs/common';
import { OverviewSummaryModel } from '@repo/models';
import { OverviewService } from './overview.service';

@Controller('overview')
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) {}

  @Get('summary')
  getSummary(): Promise<OverviewSummaryModel> {
    return this.overviewService.getSummary();
  }
}
