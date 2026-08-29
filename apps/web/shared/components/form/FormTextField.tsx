"use client";

import * as React from "react";
import { useController, type FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/Input";
import { cn } from "@/shared/lib/utils";
import { Field } from "@/shared/components/form/Field";
import type { FormFieldProps } from "@/shared/components/form/formFieldProps";

interface FormTextFieldProps<TFieldValues extends FieldValues>
  extends FormFieldProps<TFieldValues> {
  type?: React.HTMLInputTypeAttribute;
  /** Icon rendered inside the input, at the inline-start edge. */
  startIcon?: React.ReactNode;
  inputClassName?: string;
}

function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
  placeholder,
  type = "text",
  startIcon,
  inputClassName,
}: FormTextFieldProps<TFieldValues>) {
  const id = React.useId();
  const { field, fieldState } = useController({ control, name });
  const { value, ...fieldProps } = field;

  const input = (
    <Input
      {...fieldProps}
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled ?? fieldProps.disabled}
      value={(value as string | undefined) ?? ""}
      className={cn(startIcon && "ps-9", inputClassName)}
    />
  );

  return (
    <Field
      label={label}
      htmlFor={id}
      error={fieldState.error?.message}
      className={className}
    >
      {startIcon ? (
        <div className="relative">
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2">
            {startIcon}
          </span>
          {input}
        </div>
      ) : (
        input
      )}
    </Field>
  );
}

export { FormTextField };
