import {
  BarChart3,
  CircleArrowRight,
  CreditCard,
  LayoutDashboard,
  WalletCards,
} from "lucide-react";
import { Routes } from "@/shared/constants/routes";

export const mainNavItems = [
  { title: "نمای کلی", href: Routes.Root, icon: LayoutDashboard },
  { title: "درآمد", href: Routes.Incomes, icon: WalletCards },
  { title: "هزینه‌ها", href: "#", icon: CreditCard },
  { title: "سرمایه‌گذاری", href: "#", icon: BarChart3 },
];

export const secondaryNavItems = [
  { title: "خروج", href: "#", icon: CircleArrowRight },
];
