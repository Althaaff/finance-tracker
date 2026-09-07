import { Transaction, TransactionAction } from "@/types/transaction";

export function transactionReducer(
  state: Transaction[],
  action: TransactionAction,
): Transaction[] {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "edit":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );

    case "delete":
      return state.filter((t) => t.id !== action.payload.id);

    default:
      return state;
  }
}
