export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

// Redux Action Type:
export type TransactionAction =
  | {
      type: "add";
      payload: Transaction;
    }
  | { type: "edit"; payload: Transaction }
  | { type: "delete"; payload: { id: string } };
