// no need to use `use-client` bcoz this component is server component

import { prisma } from "@/lib/prisma";
import TransactionsApp from "@/components/TransactionsApp";

export default async function Home() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
  });

  console.log("transactionsX", transactions);
  return (
    <>
      <main style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
        <h1>Finance Tracker</h1>
        <TransactionsApp initialTransactions={transactions} />
      </main>
    </>
  );
}
