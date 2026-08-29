import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

/** Props shared by every react-hook-form connected field component. */
export interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: ReactNode;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}
