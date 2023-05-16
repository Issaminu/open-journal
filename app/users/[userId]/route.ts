import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, isCustomError } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const userId = context.params.slug;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      throw CustomError(`User ${userId} does not exist`, 404);
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const userId = context.params.slug;
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
    if (!deletedUser) {
      throw CustomError(`User ${userId} does not exist`, 404);
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
