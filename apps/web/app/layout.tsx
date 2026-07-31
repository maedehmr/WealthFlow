import "../styles/globals.css";
import React from "react";
import type { Metadata } from "next";
import { SidebarLayout } from "@/layouts";
import { inter, vazir } from "@/styles/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    template: "%s | WealthFlow",
    default: "WealthFlow",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn(vazir.variable, inter.variable, "font-sans")}>
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
