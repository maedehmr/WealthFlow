import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  getHttpErrorCategory,
  HttpErrorCategory,
} from "@/shared/lib/httpError";

export type ErrorMessageMap = Record<HttpErrorCategory, string>;

export function getErrorMessage<T extends ErrorMessageMap>(
  error: unknown,
  categoryToMessage: T,
): T[HttpErrorCategory] {
  const category = getHttpErrorCategory(error);
  return categoryToMessage[category];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
