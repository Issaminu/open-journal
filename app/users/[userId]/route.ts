import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { userId: string } }
) {
  const userId = context.params.userId;
  const user = await prisma.user
    .findUnique({
      where: { id: parseInt(userId) },
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

export async function DELETE(
  _req: NextRequest,
  context: { params: { userId: string } }
) {
  const userId = context.params.userId;
  await prisma.user
    .delete({
      where: { id: parseInt(userId) },
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
