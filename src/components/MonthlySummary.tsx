import { Transaction } from "@prisma/client";

interface MonthlySummaryProps {
  transactions: Transaction[];
}

export default function MonthlySummary({ transactions }: MonthlySummaryProps) {
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.amount >= 0) acc.income += t.amount;
      else acc.expenses += Math.abs(t.amount);

      return acc;
    },
    { income: 0, expenses: 0 },
  );

  const net = totals.income - totals.expenses;

  return (
    <div
      style={{ display: "flex", gap: 24, marginBottom: 16, fontWeight: 600 }}
    >
      <span>Income: ${totals.income.toFixed(2)}</span>
      <span>Expense: ${totals.expenses.toFixed(2)}</span>
      <span style={{ color: net >= 0 ? "green" : "crimson" }}>
        Net: ${net.toFixed(2)}
      </span>
    </div>
  );
}
