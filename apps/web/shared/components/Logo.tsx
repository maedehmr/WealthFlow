import { WalletCards } from "lucide-react";

function Logo() {
  return (
    <div className="flex gap-2">
      <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-xs">
        <WalletCards className="size-5" />
      </div>
      <div className="grid gap-0.5">
        <span className="text-sm font-semibold">WealthFlow</span>
        <span className="text-xs text-muted-foreground">مدیریت مالی شخصی</span>
      </div>
    </div>
  );
}

export { Logo };
