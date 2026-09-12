import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { transactionSchema } from "@/lib/schemas/transaction";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.transaction.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // validate the incoming body against the shared zod schema
    const validationResult = transactionSchema.safeParse(body);

    // if validation fails return 400 Bad Request with field errors
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // extract the validated data safely :
    const validatedData = validationResult.data;

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 },
    );
  }
}
