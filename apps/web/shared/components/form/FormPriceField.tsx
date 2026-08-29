"use client";

import * as React from "react";
import { useController, type FieldValues } from "react-hook-form";
import { PriceInput } from "@/shared/components/PriceInput";
import { Field } from "@/shared/components/form/Field";
import type { FormFieldProps } from "@/shared/components/form/formFieldProps";

function FormPriceField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
  placeholder,
}: FormFieldProps<TFieldValues>) {
  const id = React.useId();
  const { field, fieldState } = useController({ control, name });

  return (
    <Field
      label={label}
      htmlFor={id}
      error={fieldState.error?.message}
      className={className}
    >
      <PriceInput
        id={id}
        name={field.name}
        placeholder={placeholder}
        disabled={disabled ?? field.disabled}
        value={field.value as number | undefined}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </Field>
  );
}

export { FormPriceField };
