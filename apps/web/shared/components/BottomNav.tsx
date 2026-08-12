import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { mainNavItems } from "@/shared/constants/navItems";

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="grid grid-cols-4 gap-1">
        {mainNavItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              item.active &&
                "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs",
            )}
          >
            <item.icon className="size-4" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export { BottomNav };
