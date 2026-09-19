"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: 4,
        border: "1px solid #ccc",
        backgroundColor: "#fff",
      }}
    >
      Sign Out
    </button>
  );
}
