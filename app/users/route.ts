import { CustomError, isCustomError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";
import bcrypt from "bcrypt";
import { userSchemaCreate } from "@/lib/zod";
import { ZodError } from "zod";
import { userSchemaUpdate } from "../../lib/zod";

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

export async function POST(req: NextRequest) {
  try {
    const validatedBody = userSchemaCreate.parse(req.body);
    const { name, email, password } = validatedBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      })
      .catch((error) => {
        throw CustomError(error, 400);
      });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const validatedBody = userSchemaUpdate.parse(req.body);
    const { email, name, password } = validatedBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user
      .update({
        where: {
          id: 0, //temp value
        },
        data: { email, name, password: hashedPassword },
      })
      .catch((error) => {
        throw CustomError(error, 400);
      });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
