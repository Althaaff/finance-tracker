"use client";

import { Transaction } from "@/types/transaction";
import { useState } from "react";

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
  editingTransaction: Transaction | null;
  onUpdate: (transaction: Transaction) => void;
}

export default function TransactionForm({
  onAdd,
  editingTransaction,
  onUpdate,
}: TransactionFormProps) {
  const [description, setDescription] = useState(
    editingTransaction ? editingTransaction.description : "",
  );
  const [amount, setAmount] = useState(
    editingTransaction ? editingTransaction.amount.toString() : "",
  );
  const [category, setCategory] = useState(
    editingTransaction ? editingTransaction.category : "General",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount) return;

    if (editingTransaction) {
      // save changes to existing transaction
      onUpdate({
        ...editingTransaction,
        description,
        amount: Number(amount),
        category,
      });
    } else {
      // create new transaction:
      onAdd({
        id: crypto.randomUUID(),
        description,
        amount: Number(amount),
        category,
        date: new Date(),
      });

      setDescription("");
      setAmount("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, marginBottom: 16 }}
    >
      <input
        type="text"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />

      <input
        placeholder="Amount (negative = expense)"
        type="number"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(e.target.value)
        }
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>General</option>
        <option>Groceries</option>
        <option>Rent</option>
        <option>Salary</option>
        <option>Utilities</option>
      </select>

      <button type="submit">{editingTransaction ? "Save" : "Add"}</button>
    </form>
  );
}
