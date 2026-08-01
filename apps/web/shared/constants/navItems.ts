import {
  BarChart3,
  CircleArrowRight,
  CreditCard,
  LayoutDashboard,
  WalletCards,
} from "lucide-react";

export const mainNavItems = [
  { title: "نمای کلی", href: "/", icon: LayoutDashboard, active: true },
  { title: "درآمد", href: "#", icon: WalletCards },
  { title: "هزینه‌ها", href: "#", icon: CreditCard },
  { title: "سرمایه‌گذاری", href: "#", icon: BarChart3 },
];

export const secondaryNavItems = [
  { title: "خروج", href: "#", icon: CircleArrowRight },
];
