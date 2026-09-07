// no need to use `use-client` bcoz this component is server component

import TransactionsApp from "@/components/TransactionsApp";

export default async function Home() {
  return (
    <>
      <main style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
        <h1>Finance Tracker</h1>
        <TransactionsApp />
      </main>
    </>
  );
}
