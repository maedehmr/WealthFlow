import { ExpensesTable } from "@/features/expenses/ui/ExpensesTable";

export default function ExpensesPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:gap-6">
      <ExpensesTable />
    </div>
  );
}
