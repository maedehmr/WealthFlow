"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { CircleArrowRight, WalletCards } from "lucide-react";
import { authService } from "@/features/auth/model/authService";
import { Routes } from "@/shared/constants/routes";
import { formatJalaliLongDate } from "@/shared/lib/format";

function getGreeting(hour: number): string {
  if (hour < 5) return "شب بخیر";
  if (hour < 12) return "صبح بخیر";
  if (hour < 17) return "ظهر بخیر";
  if (hour < 21) return "عصر بخیر";
  return "شب بخیر";
}

function Header() {
  const router = useRouter();
  const [today] = useState(() => formatJalaliLongDate(Date.now()));
  const [greeting] = useState(() => getGreeting(new Date().getHours()));

  const handleExit = async () => {
    await authService.logout();
    router.push(Routes.Login);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs lg:hidden">
          <WalletCards className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{greeting}</p>
          <p className="truncate text-xs text-muted-foreground">{today}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="خروج"
          className="lg:hidden"
          onClick={() => void handleExit()}
        >
          <CircleArrowRight className="size-4" />
        </Button>
      </div>
    </header>
  );
}

export { Header };
