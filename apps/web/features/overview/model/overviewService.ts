import type { OverviewSummaryModel } from "@repo/models";
import { overviewApi } from "@/features/overview/api/overviewApi";

export class OverviewService {
  getSummary(): Promise<OverviewSummaryModel> {
    return overviewApi.getSummary();
  }
}

export const overviewService = new OverviewService();
