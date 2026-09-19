import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import TransactionsApp from "@/components/TransactionsApp";
import SignOutButton from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Redirect unauthenticated users safely instead of crashing
  if (!session?.user) {
    redirect("/signup"); // or "/login"
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.user.id }, // No exclamation marks needed now!
    orderBy: { date: "desc" },
  });

  return (
    <main style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>Finance Tracker ({session.user.email})</h1>
        <SignOutButton />
      </header>

      <TransactionsApp initialTransactions={transactions} />
    </main>
  );
}
