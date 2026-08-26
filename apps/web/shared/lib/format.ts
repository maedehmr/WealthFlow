import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function formatJalaliDate(timestamp: number): string {
  return new DateObject({
    date: new Date(timestamp),
    calendar: persian,
    locale: persian_fa,
  }).format();
}

export function formatJalaliMonth(timestamp: number): string {
  return new DateObject({
    date: new Date(timestamp),
    calendar: persian,
    locale: persian_fa,
  }).format("MMMM YYYY");
}

export function getNumberFormatter(
  locale: string = "fa-IR",
  maximumFractionDigits = 3,
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, { maximumFractionDigits });
}

const tomanFormatter = getNumberFormatter("fa-IR");

export function formatToman(amount: number): string {
  return tomanFormatter.format(amount);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
