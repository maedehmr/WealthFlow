import { DebtsTable } from "@/features/debts/ui/DebtsTable";

export default function DebtsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:gap-6">
      <DebtsTable />
    </div>
  );
}
