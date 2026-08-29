"use client";

import * as React from "react";
import { useController, type FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { Field } from "@/shared/components/form/Field";
import type { FormFieldProps } from "@/shared/components/form/formFieldProps";

interface FormSelectFieldProps<TFieldValues extends FieldValues>
  extends FormFieldProps<TFieldValues> {
  /** Map of option value → localized label. */
  items: Record<string, string>;
}

function FormSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  items,
  className,
  disabled,
  placeholder = "انتخاب کنید",
}: FormSelectFieldProps<TFieldValues>) {
  const id = React.useId();
  const { field, fieldState } = useController({ control, name });

  return (
    <Field
      label={label}
      htmlFor={id}
      error={fieldState.error?.message}
      className={className}
    >
      <Select
        name={field.name}
        items={items}
        value={(field.value as string | null | undefined) ?? null}
        onValueChange={(value) => field.onChange(value)}
        onOpenChange={(open) => {
          if (!open) field.onBlur();
        }}
        disabled={disabled ?? field.disabled}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(items).map(([value, optionLabel]) => (
            <SelectItem key={value} value={value}>
              {optionLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export { FormSelectField };
