import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  const user = await prisma.user.create({
    data: { email: result.data.email, hashedPassword, name: result.data.name },
  });

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
    },
    { status: 201 },
  );
}
