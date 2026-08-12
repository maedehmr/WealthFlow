import { isAxiosError } from "axios";
import { HttpCategory } from "@/shared/constants/httpCategory";

export type HttpErrorCategory =
  | HttpCategory.Unauthorized
  | HttpCategory.Forbidden
  | HttpCategory.RateLimited
  | HttpCategory.ServerError
  | HttpCategory.NetworkError
  | HttpCategory.Unknown;

export function getHttpErrorCategory(error: unknown): HttpErrorCategory {
  if (!isAxiosError(error)) {
    return HttpCategory.Unknown;
  }

  if (!error.response) {
    return HttpCategory.NetworkError;
  }

  switch (error.response.status) {
    case 401:
      return HttpCategory.Unauthorized;
    case 403:
      return HttpCategory.Forbidden;
    case 429:
      return HttpCategory.RateLimited;
    default:
      return error.response.status >= 500
        ? HttpCategory.ServerError
        : HttpCategory.Unknown;
  }
}
