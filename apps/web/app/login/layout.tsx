import React from "react";
import { FullLayout } from "@/layouts";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <FullLayout>{children}</FullLayout>;
}
