import { InvestmentsTable } from "@/features/investments/ui/InvestmentsTable";

export default function InvestmentsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:gap-6">
      <InvestmentsTable />
    </div>
  );
}
