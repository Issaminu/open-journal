import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

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
    console.log(articles);
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest & {
    body: { title: string; content: string; image: File };
  }
) {
  try {
    const { title, content } = req.body;
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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest & {
    body: { articleId: number; title: string; content: string; image: File };
  }
) {
  const { articleId, title, content, image } = req.body;
  const tempStockImage =
    "https://static8.depositphotos.com/1423699/902/i/450/depositphotos_9022196-stock-photo-newspaper.jpg";
  const article = await prisma.article.update({
    where: { id: req.body.articleId },
    data: {
      title,
      content,
      image: tempStockImage,
    },
  });
  if (!article) {
    return NextResponse.json(
      { message: `Article ${articleId} does not exist` },
      { status: 404 }
    );
  }
  return NextResponse.json({ article }, { status: 201 });
}
