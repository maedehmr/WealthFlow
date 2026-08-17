import { HttpErrorCategory } from "@/shared/lib/httpError";

export const ErrorMessage = {
  Unauthorized: "برای انجام این عملیات باید وارد حساب خود شوید.",
  Forbidden: "شما اجازه دسترسی به این بخش را ندارید.",
  TooManyAttempts:
    "تعداد درخواست‌های شما زیاد بوده؛ کمی بعد دوباره امتحان کنید.",
  ServerError: "مشکلی در سرور رخ داده است. لطفاً بعداً تلاش کنید.",
  NetworkError: "اتصال اینترنت خود را بررسی کنید.",
  Unknown: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
} as const;

export const ErrorCategoryToMessage: Record<HttpErrorCategory, string> = {
  unauthorized: ErrorMessage.Unauthorized,
  forbidden: ErrorMessage.Forbidden,
  rateLimited: ErrorMessage.TooManyAttempts,
  serverError: ErrorMessage.ServerError,
  networkError: ErrorMessage.NetworkError,
  unknown: ErrorMessage.Unknown,
};
