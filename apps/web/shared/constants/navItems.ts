import {
  BarChart3,
  CircleArrowRight,
  CreditCard,
  LayoutDashboard,
  PiggyBank,
  WalletCards,
} from "lucide-react";
import { Routes } from "@/shared/constants/routes";

export const mainNavItems = [
  { title: "نمای کلی", href: Routes.Root, icon: LayoutDashboard },
  { title: "درآمد", href: Routes.Incomes, icon: WalletCards },
  { title: "هزینه‌ها", href: Routes.Expenses, icon: CreditCard },
  { title: "سرمایه‌گذاری", href: Routes.Investments, icon: BarChart3 },
  { title: "دارایی‌ها", href: Routes.Assets, icon: PiggyBank },
];

export const secondaryNavItems = [
  { title: "خروج", href: "#", icon: CircleArrowRight },
];
