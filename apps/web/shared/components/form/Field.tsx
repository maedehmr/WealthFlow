import * as React from "react";
import { Label } from "@/shared/components/Label";
import { cn } from "@/shared/lib/utils";

interface FieldProps {
  label: React.ReactNode;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Presentational wrapper for a single labelled form control.
 *
 * Uses a flex column (not CSS grid) so that when a sibling field in the same
 * grid row grows — e.g. because it shows a validation error — this field is not
 * stretched with extra space appearing between the label and the input.
 */
function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}

export { Field };
export type { FieldProps };
