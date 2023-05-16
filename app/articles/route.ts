import { articleSchemaUpdate } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const takeParam = searchParams.get("take");
    const skipParam = searchParams.get("skip");
    if (!takeParam || (skipParam && parseInt(skipParam) < 0)) {
      return NextResponse.error();
    }
    const take = parseInt(takeParam);
    const skip = skipParam ? parseInt(skipParam) + 1 : 0;
    const articles = await prisma.article.findMany({
      where: { id: { gte: skip } },
      take: take,
    });
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const validatedBody = articleSchemaUpdate.parse(req.body);

    const { title, content } = validatedBody;
    const tempStockImage =
      "https://static8.depositphotos.com/1423699/902/i/450/depositphotos_9022196-stock-photo-newspaper.jpg";
    const article = await prisma.article.create({
      data: {
        title,
        content,
        isPublished: true,
        image: tempStockImage,
        authorId: 0, //temp value
      },
    });
    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const validatedBody = articleSchemaUpdate.safeParse(req.body);
    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error },
        { status: 400 }
      );
    }
    const { id, title, content } = validatedBody.data; //TODO: Add image support
    const tempStockImage =
      "https://static8.depositphotos.com/1423699/902/i/450/depositphotos_9022196-stock-photo-newspaper.jpg";
    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        image: tempStockImage,
      },
    });
    if (!article) throw Error(`Article ${id} does not exist`);

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
