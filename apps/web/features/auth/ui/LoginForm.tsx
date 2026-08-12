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
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export function LoginForm() {
  const { register, errors, onSubmit, isPending, errorMessage } =
    useLoginForm();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">ورود به حساب</CardTitle>
        <CardDescription>برای مشاهده داشبورد مالی وارد شوید.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">ایمیل</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pr-9 text-left"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">رمز عبور</Label>
            </div>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pr-9 text-left"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
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
