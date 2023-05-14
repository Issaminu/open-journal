import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const takeParam = searchParams.get("take");
  const skipParam = searchParams.get("skip");
  if (!takeParam || (skipParam && parseInt(skipParam) < 0)) {
    return NextResponse.error();
  }
  const take = parseInt(takeParam);
  const skip = skipParam ? parseInt(skipParam) + 1 : 0;
  const categories = await prisma.category.findMany({
    where: { id: { gte: skip } },
    take: take,
  });
  console.log(categories);
  return NextResponse.json({ categories }, { status: 200 });
}

export async function POST(req: NextRequest & { body: { name: string } }) {
  const { name } = req.body;
  const categories = await prisma.category.findMany({
    where: {
      authorId: 0,
    },
  });
  if (categories.some((category) => category.name === name)) {
    return NextResponse.json(
      { message: "Category already exists" },
      { status: 400 }
    );
  }
  const category = await prisma.category.create({
    data: { name, authorId: 0 },
  });
  return NextResponse.json({ category }, { status: 201 });
}

export async function PATCH(
  req: NextRequest & { body: { articleId: number; name: string } }
) {
  const { articleId, name } = req.body;
  const categories = await prisma.category.findMany({
    where: {
      authorId: 0,
    },
  });
  if (categories.some((category) => category.name === name)) {
    return NextResponse.json(
      { message: "Category already exists" },
      { status: 400 }
    );
  }
  const category = await prisma.category
    .update({
      where: { id: articleId },
      data: { name },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: "Category does not exist" },
        { status: 404 }
      );
    });
  return NextResponse.json({ category }, { status: 201 });
}
