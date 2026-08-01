import React from "react";
import { AuthLayout } from "@/shared/layouts";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
