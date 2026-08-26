import React from "react";
import { Button } from "@/shared/components/Button";
import { Bell, Search, WalletCards } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs lg:hidden">
          <WalletCards className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">داشبورد</p>
          <p className="truncate text-xs text-muted-foreground">
            وضعیت امروز حساب ها و جریان نقدی
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="icon-sm" aria-label="جستجو">
          <Search className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="اعلان ها">
          <Bell className="size-4" />
        </Button>
      </div>
    </header>
  );
}

export { Header };
