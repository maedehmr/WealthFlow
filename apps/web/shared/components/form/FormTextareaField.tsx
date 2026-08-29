"use client";

import * as React from "react";
import { useController, type FieldValues } from "react-hook-form";
import { Textarea } from "@/shared/components/Textarea";
import { Field } from "@/shared/components/form/Field";
import type { FormFieldProps } from "@/shared/components/form/formFieldProps";

function FormTextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
  placeholder,
}: FormFieldProps<TFieldValues>) {
  const id = React.useId();
  const { field, fieldState } = useController({ control, name });
  const { value, ...fieldProps } = field;

  return (
    <Field
      label={label}
      htmlFor={id}
      error={fieldState.error?.message}
      className={className}
    >
      <Textarea
        {...fieldProps}
        id={id}
        placeholder={placeholder}
        disabled={disabled ?? fieldProps.disabled}
        value={(value as string | undefined) ?? ""}
      />
    </Field>
  );
}

export { FormTextareaField };
