"use client";

import { useReducer, useState } from "react";
import { transactionReducer } from "@/lib/transaction-reducer";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlySummary from "@/components/MonthlySummary";
import { Transaction } from "@/types/transaction";

export default function TransactionsApp() {
  const [transactions, dispatch] = useReducer(transactionReducer, []);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleAdd = (t: Transaction) => {
    dispatch({
      type: "add",
      payload: t,
    });
  };

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
  };

  const handleUpdate = (updatedTransaction: Transaction) => {
    dispatch({ type: "edit", payload: updatedTransaction });
    setEditingTransaction(null);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: "delete",
      payload: { id },
    });
  };

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
