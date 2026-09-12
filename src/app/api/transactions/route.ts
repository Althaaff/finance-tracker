import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/schemas/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = transactionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const transaction = await prisma.transaction.create({
    data: result.data, // fully typed AND validated
  });

  return NextResponse.json(transaction, { status: 201 });
}
