import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { categoryId: string } }
) {
  const categoryId = context.params.categoryId;
  const category = await prisma.category
    .findUnique({
      where: { id: parseInt(categoryId) },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: "Category does not exist" },
        { status: 404 }
      );
    });
  return NextResponse.json(category, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { categoryId: string } }
) {
  const categoryId = context.params.categoryId;
  await prisma.category
    .delete({
      where: { id: parseInt(categoryId) },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: `Category ${categoryId} does not exist` },
        { status: 404 }
      );
    });
  return NextResponse.json(
    { message: "Category deleted successfully" },
    { status: 200 }
  );
}
