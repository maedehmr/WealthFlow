import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import Logo from "@/shared/components/Logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6">
      <Logo />
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">ورود به حساب</CardTitle>
          <CardDescription>برای مشاهده داشبورد مالی وارد شوید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pr-9 text-left"
                />
              </div>
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
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
