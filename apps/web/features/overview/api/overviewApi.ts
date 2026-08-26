import type { OverviewSummaryModel } from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";

export interface OverviewApi {
  getSummary(): Promise<OverviewSummaryModel>;
}

class HttpOverviewApi implements OverviewApi {
  async getSummary(): Promise<OverviewSummaryModel> {
    const { data } = await httpClient.get<OverviewSummaryModel>(
      "/overview/summary",
    );
    return data;
  }
}

export const overviewApi: OverviewApi = new HttpOverviewApi();
