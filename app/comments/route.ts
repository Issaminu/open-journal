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
    const comments = await prisma.comment.findMany({
      where: { id: { gte: skip } },
      take: take,
    });
    console.log(comments);
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest & { body: { articleId: number; content: string } }
) {
  try {
    const { articleId, content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: 0, //temp value
      },
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest & { body: { articleId: number; content: string } }
) {
  try {
    const { articleId, content } = req.body;
    const comment = await prisma.comment.update({
      where: { id: articleId },
      data: {
        content,
      },
    });
    if (!comment) {
      return NextResponse.json(
        { message: `Comment ${articleId} does not exist` },
        { status: 404 }
      );
    }
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
