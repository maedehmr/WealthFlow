import { mainNavItems, secondaryNavItems } from "@/shared/constants/navItems";
import Link from "next/link";
import React from "react";
import { cn } from "@/shared/lib/utils";

export default function AsideNav() {
  return (
    <>
      <nav className="flex flex-1 flex-col gap-6 p-4">
        <div className="grid gap-1.5">
          {mainNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                item.active &&
                  "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs",
              )}
            >
              {item.active ? (
                <span className="absolute right-0 h-5 w-1 rounded-l bg-sidebar-primary" />
              ) : null}
              <item.icon className="size-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="grid gap-1">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="size-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
