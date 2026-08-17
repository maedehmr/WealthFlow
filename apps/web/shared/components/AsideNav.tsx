"use client";

import { mainNavItems, secondaryNavItems } from "@/shared/constants/navItems";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Routes } from "@/shared/constants/routes";
import { authService } from "@/features/auth/model/authService";

function AsideNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleExit = async () => {
    await authService.logout();
    router.push(Routes.Login);
  };

  return (
    <>
      <nav className="flex flex-1 flex-col gap-6 p-4">
        <div className="grid gap-1.5">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs",
                )}
              >
                {isActive ? (
                  <span className="absolute right-0 h-5 w-1 rounded-l bg-sidebar-primary" />
                ) : null}
                <item.icon className="size-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="grid gap-1">
          {secondaryNavItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => void handleExit()}
              className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-right text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="size-4" />
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export { AsideNav };
