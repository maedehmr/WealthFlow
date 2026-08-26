"use client";

import DatePickerLib from "react-multi-date-picker";
import type { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { cn } from "@/shared/lib/utils";

interface DatePickerProps {
  id?: string;
  name?: string;
  value?: number;
  onChange?: (timestamp: number | undefined) => void;
  onClose?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function DatePicker({
  id,
  name,
  value,
  onChange,
  onClose,
  placeholder,
  className,
  disabled,
}: DatePickerProps) {
  return (
    <div data-slot="date-picker" className="w-full">
      <DatePickerLib
        calendar={persian}
        locale={persian_fa}
        editable={false}
        calendarPosition="bottom-right"
        id={id}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value !== undefined ? new Date(value) : undefined}
        onChange={(dateObject: DateObject | null) =>
          onChange?.(dateObject ? dateObject.toDate().getTime() : undefined)
        }
        onClose={onClose}
        inputClass={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          className,
        )}
        containerClassName="w-full"
      />
    </div>
  );
}

export { DatePicker };
