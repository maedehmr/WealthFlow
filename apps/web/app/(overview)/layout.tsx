import React from "react";
import { redirect } from "next/navigation";
import { MainLayout } from "@/shared/layouts";
import { getAuthSession } from "@/features/auth/model/authSession";
import { Routes } from "@/shared/constants/routes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getAuthSession();
  if (!session) redirect(Routes.Login);

  return <MainLayout>{children}</MainLayout>;
}
