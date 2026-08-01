import React from "react";

interface FullLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: FullLayoutProps) {
  return (
    <main className="min-h-svh bg-muted px-4 py-6 text-foreground md:px-8 md:py-10">
      {children}
    </main>
  );
}
