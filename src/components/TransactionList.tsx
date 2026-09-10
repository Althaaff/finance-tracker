"use client";

import { Transaction } from "@prisma/client";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return <p>No transaction yet.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {transactions.map((t) => (
        <li
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 0",
          }}
        >
          <span>
            {new Date(t.date).toLocaleDateString("en-US")} · {t.category} ·{" "}
            {t.description}{" "}
          </span>

          <strong>
            {t.amount < 0 ? "-" : "c+"} ${Math.abs(t.amount).toFixed(2)}
          </strong>

          <button
            className="text-green-400"
            onClick={() => onEdit(t)}
            style={{ marginLeft: 8 }}
          >
            Edit
          </button>

          <button onClick={() => onDelete(t.id)} style={{ marginLeft: 8 }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
