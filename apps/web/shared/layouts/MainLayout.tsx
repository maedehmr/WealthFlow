import React from "react";
import { AsideNav, BottomNav, Header, Logo } from "@/shared/components";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-72 border-l border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <Logo />
        </div>
        <AsideNav />
      </aside>
      <div className="lg:pr-72">
        <Header />
        <main className="min-h-[calc(100svh-4rem)] p-4 pb-24 md:p-6 lg:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
