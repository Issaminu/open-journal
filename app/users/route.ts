import { validateUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const takeParam = searchParams.get("take");
  const skipParam = searchParams.get("skip");
  if (!takeParam || (skipParam && parseInt(skipParam) < 0)) {
    return NextResponse.error();
  }
  const take = parseInt(takeParam);
  const skip = skipParam ? parseInt(skipParam) + 1 : 0;
  const users = await prisma.user.findMany({
    where: { id: { gte: skip } },
    take: take,
  });
  console.log(users);
  return NextResponse.json({ users }, { status: 200 });
}

export async function POST(
  req: NextRequest & {
    body: { name: string; email: string; password: string };
  }
) {
  const { name, email, password } = req.body;
  const { valid, message } = validateUser(name, email, password);
  if (!valid) return NextResponse.json({ message }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "This email is already in use" },
      { status: 400 }
    );
  }
  return NextResponse.json({ user }, { status: 201 });
}

export async function PATCH(
  req: NextRequest & { body: { email: string; name: string; password: string } }
) {
  const { email, name, password } = req.body;
  const { valid, message } = validateUser(name, email, password);
  if (!valid) return NextResponse.json({ message }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({
    where: { id: 0 },
    data: { email, name, password: hashedPassword },
  });
  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 404 }
    );
  }
  return NextResponse.json({ user }, { status: 201 });
}
