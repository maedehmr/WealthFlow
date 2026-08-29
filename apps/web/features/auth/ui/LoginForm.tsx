"use client";

import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/shared/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import { FormTextField } from "@/shared/components/form";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export function LoginForm() {
  const { control, onSubmit, isPending, errorMessage } = useLoginForm();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">ورود به حساب</CardTitle>
        <CardDescription>برای مشاهده داشبورد مالی وارد شوید.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={onSubmit} noValidate>
          <FormTextField
            control={control}
            name="email"
            label="ایمیل"
            type="email"
            placeholder="name@example.com"
            startIcon={<Mail className="size-4" />}
            inputClassName="text-left"
          />
          <FormTextField
            control={control}
            name="password"
            label="رمز عبور"
            type="password"
            placeholder="••••••••"
            startIcon={<LockKeyhole className="size-4" />}
            inputClassName="text-left"
          />
          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
