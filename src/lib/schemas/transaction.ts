import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Description is required").max(100),
  amount: z
    .number({ message: "Amount must be a number" })
    .gt(0, "Amount must be greater than 0")
    .max(1000000, "Amount cannot exceed $1,000,000")
    .refine((val) => val !== 0, "Amount can't be zero"),
  category: z.enum(["General", "Groceries", "Rent", "Salary", "Utilities"], {
    message: "Pick a valid category",
  }),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
