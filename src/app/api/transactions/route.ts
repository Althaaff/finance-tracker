import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transaction = await prisma.transaction.create({
    data: {
      description: body.description,
      amount: Number(body.amount),
      category: body.category,
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}
