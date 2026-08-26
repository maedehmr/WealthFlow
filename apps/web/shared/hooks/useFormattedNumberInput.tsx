"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const DIGIT_REGEX = /[0-9۰-۹]/;

function toEnglishDigits(text: string): string {
  return text.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

function parseRaw(text: string): number | undefined {
  const normalized = toEnglishDigits(text).replace(/[^\d.-]/g, "");
  if (normalized === "" || normalized === "-") return undefined;
  const num = Number(normalized);
  return Number.isNaN(num) ? undefined : num;
}

function countDigits(text: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (DIGIT_REGEX.test(text[i])) count++;
  }
  return count;
}

interface UseFormattedNumberInputOptions {
  value?: number;
  onChange?: (value: number | undefined) => void;
  format: (value: number) => string;
}

export function useFormattedNumberInput({
  value,
  onChange,
  format,
}: UseFormattedNumberInputOptions) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [displayValue, setDisplayValue] = useState<string>(() =>
    value !== undefined ? format(value) : "",
  );

  useEffect(() => {
    const isFocused = document.activeElement === inputRef.current;
    if (isFocused) return;
    setDisplayValue(value !== undefined ? format(value) : "");
  }, [value, format]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawText = input.value;
      const caretPos = input.selectionStart ?? rawText.length;

      const digitsBeforeCaret = countDigits(rawText.slice(0, caretPos));

      const parsed = parseRaw(rawText);
      const formatted = parsed !== undefined ? format(parsed) : "";

      setDisplayValue(formatted);
      onChange?.(parsed);

      requestAnimationFrame(() => {
        if (!inputRef.current) return;
        let seen = 0;
        let pos = formatted.length;
        for (let i = 0; i < formatted.length; i++) {
          if (DIGIT_REGEX.test(formatted[i])) seen++;
          if (seen === digitsBeforeCaret) {
            pos = i + 1;
            break;
          }
        }
        inputRef.current.setSelectionRange(pos, pos);
      });
    },
    [format, onChange],
  );

  return { inputRef, displayValue, handleChange };
}
