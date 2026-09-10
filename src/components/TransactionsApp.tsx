"use client";

import { useEffect, useReducer, useState } from "react";
import { transactionReducer } from "@/lib/transaction-reducer";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlySummary from "@/components/MonthlySummary";
import type { Transaction } from "@/types/transaction";
import { useRouter } from "next/navigation";

interface TransactionsAppProps {
  initialTransactions: Transaction[];
}

export default function TransactionsApp({
  initialTransactions,
}: TransactionsAppProps) {
  // const [transactions, dispatch] = useReducer(transactionReducer, []);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [transactions, setTransaction] = useState(initialTransactions);

  async function handleAdd(t: Omit<Transaction, "id" | "date">) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    });

    if (response.ok) {
      // get the newly created item
      const newTransaction = await response.json();

      // optimistic update Ui
      setTransaction((prev) => [newTransaction, ...prev]);
    }
  }

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
  };

  async function handleUpdate(updatedTransaction: Transaction) {
    const response = await fetch(`/api/transactions/${updatedTransaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTransaction),
    });

    if (response.ok) {
      const savedTransaction = await response.json();

      setTransaction((prev) =>
        prev.map((item) =>
          item.id === savedTransaction.id ? savedTransaction : item,
        ),
      );

      setEditingTransaction(null);
    }
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // filter out the deleted item from state immediately
      setTransaction((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div>
      <MonthlySummary transactions={transactions} />
      <TransactionForm
        key={editingTransaction ? editingTransaction?.id : "new"}
        onAdd={handleAdd}
        editingTransaction={editingTransaction}
        onUpdate={handleUpdate}
      />
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
