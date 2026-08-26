import { OverviewDashboard } from "@/features/overview/ui/OverviewDashboard";

export default function OverviewPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:gap-6">
      <OverviewDashboard />
    </div>
  );
}
