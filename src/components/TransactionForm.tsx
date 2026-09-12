"use client";

import { Transaction } from "@/types/transaction";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionInput } from "@/lib/schemas/transaction";

interface TransactionFormProps {
  onAdd: (transaction: TransactionInput) => void;
  editingTransaction: Transaction | null;
  onUpdate: (transaction: Transaction) => void;
}

export default function TransactionForm({
  onAdd,
  editingTransaction,
  onUpdate,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { description: "", amount: 0, category: "General" },
  });

  useEffect(() => {
    if (editingTransaction) {
      reset({
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
      });
    } else {
      reset({ description: "", amount: 0, category: "General" });
    }
  }, [editingTransaction, reset]);

  const onSubmit = (data: TransactionInput) => {
    if (editingTransaction) {
      // update existing transaction
      onUpdate({
        ...editingTransaction,
        ...data,
      });
    } else {
      // add new transaction
      onAdd(data);
    }
    reset({ description: "", amount: 0, category: "General" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 16 }}>
      <div className="flex gap-8">
        <div>
          <input
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <p style={{ fontSize: 12, color: "crimson" }}>
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Amount"
            step={"0.01"}
            {...register("amount", { valueAsNumber: true })}
          />

          {errors.amount && (
            <p style={{ color: "crimson", fontSize: 12 }}>
              {errors.amount.message}
            </p>
          )}
        </div>

        <select {...register("category")}>
          <option>General</option>
          <option>Groceries</option>
          <option>Rent</option>
          <option>Salary</option>
          <option>Utilities</option>
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? editingTransaction
              ? "Saving..."
              : "Adding..."
            : editingTransaction
              ? "Save"
              : "Add"}
        </button>
      </div>
    </form>
  );
}
