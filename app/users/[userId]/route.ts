import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, params: { userId: number }) {
  const userId = params.userId;
  const user = await prisma.user
    .findUnique({
      where: { id: userId },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    });
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(_req: NextRequest, params: { userId: number }) {
  const userId = params.userId;
  await prisma.user
    .delete({
      where: { id: userId },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: `User ${userId} does not exist` },
        { status: 404 }
      );
    });
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
