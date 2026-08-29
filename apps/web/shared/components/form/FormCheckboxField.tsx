"use client";

import * as React from "react";
import { useController, type FieldValues } from "react-hook-form";
import { Checkbox } from "@/shared/components/Checkbox";
import { Label } from "@/shared/components/Label";
import { cn } from "@/shared/lib/utils";
import type { FormFieldProps } from "@/shared/components/form/formFieldProps";

interface FormCheckboxFieldProps<TFieldValues extends FieldValues>
  extends Omit<FormFieldProps<TFieldValues>, "placeholder"> {
  /** Overrides the default `field.onChange` — use for side effects. */
  onCheckedChange?: (checked: boolean) => void;
}

function FormCheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
  onCheckedChange,
}: FormCheckboxFieldProps<TFieldValues>) {
  const id = React.useId();
  const { field, fieldState } = useController({ control, name });

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Checkbox
        id={id}
        name={field.name}
        checked={Boolean(field.value)}
        onCheckedChange={(checked) =>
          (onCheckedChange ?? field.onChange)(checked)
        }
        onBlur={field.onBlur}
        disabled={disabled ?? field.disabled}
      />
      <Label htmlFor={id}>{label}</Label>
      {fieldState.error?.message && (
        <p className="text-destructive w-full text-sm">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}

export { FormCheckboxField };
