"use client";

import { useMemo } from "react";
import { Input } from "@/shared/components/Input";
import { cn } from "@/shared/lib/utils";
import { getNumberFormatter } from "@/shared/lib/format";
import { useFormattedNumberInput } from "@/shared/hooks/useFormattedNumberInput";

interface PriceInputProps {
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

function PriceInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  disabled,
  locale = "fa-IR",
}: PriceInputProps) {
  const formatter = useMemo(() => getNumberFormatter(locale), [locale]);
  const format = useMemo(
    () => (n: number) => formatter.format(n),
    [formatter],
  );

  const { inputRef, displayValue, handleChange } = useFormattedNumberInput({
    value,
    onChange,
    format,
  });

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

export { PriceInput };
