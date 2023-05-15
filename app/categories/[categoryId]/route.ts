import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { categoryId: string } }
) {
  try {
    const categoryId = context.params.categoryId;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });
    if (!category)
      return NextResponse.json(
        { message: `Category ${categoryId} does not exist` },
        { status: 404 }
      );
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { categoryId: string } }
) {
  try {
    const categoryId = context.params.categoryId;
    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(categoryId) },
    });
    if (!deletedCategory) {
      return NextResponse.json(
        { message: `Category ${categoryId} does not exist` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
