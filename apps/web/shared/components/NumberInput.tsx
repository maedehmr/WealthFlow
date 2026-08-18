"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ChangeEvent,
} from "react";
import { Input } from "@/shared/components/Input";
import { cn } from "@/shared/lib/utils";
import { getNumberFormatter } from "@/shared/lib/format";

interface NumberInputProps {
  id?: string;
  name?: string;
  value?: number;
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  locale?: string;
}

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

function NumberInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  disabled,
  locale = "fa-IR",
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatter = useMemo(() => getNumberFormatter(locale), [locale]);

  const [displayValue, setDisplayValue] = useState<string>(() =>
    value !== undefined ? formatter.format(value) : "",
  );

  useEffect(() => {
    const isFocused = document.activeElement === inputRef.current;
    if (isFocused) return;
    setDisplayValue(value !== undefined ? formatter.format(value) : "");
  }, [value, formatter]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawText = input.value;
      const caretPos = input.selectionStart ?? rawText.length;

      const digitsBeforeCaret = countDigits(rawText.slice(0, caretPos));

      const parsed = parseRaw(rawText);
      const formatted = parsed !== undefined ? formatter.format(parsed) : "";

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
    [formatter, onChange],
  );

  return (
    <Input
      ref={inputRef}
      id={id}
      name={name}
      type="text"
      inputMode="decimal"
      dir="ltr"
      value={displayValue}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("text-end", className)}
    />
  );
}

export { NumberInput };
