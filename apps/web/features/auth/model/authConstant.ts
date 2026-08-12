import { HttpErrorCategory } from "@/shared/lib/httpError";

export const AuthErrorMessage = {
  InvalidCredentials: "ایمیل یا رمز عبور اشتباه است.",
  AccountLocked: "حساب شما موقتاً مسدود شده است.",
  TooManyAttempts: "تعداد تلاش‌های شما زیاد بوده؛ کمی بعد دوباره امتحان کنید.",
  ServerError: "مشکلی در سرور رخ داده است. لطفاً بعداً تلاش کنید.",
  NetworkError: "اتصال اینترنت خود را بررسی کنید.",
  Unknown: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
} as const;

export const AuthCategoryToMessage: Record<HttpErrorCategory, string> = {
  unauthorized: AuthErrorMessage.InvalidCredentials,
  forbidden: AuthErrorMessage.AccountLocked,
  rateLimited: AuthErrorMessage.TooManyAttempts,
  serverError: AuthErrorMessage.ServerError,
  networkError: AuthErrorMessage.NetworkError,
  unknown: AuthErrorMessage.Unknown,
};
