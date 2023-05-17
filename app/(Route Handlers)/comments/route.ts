import { CustomError, isCustomError } from "@/lib/utils";
import { commentSchemaCreate, commentSchemaUpdate } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
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
    const comments = await prisma.comment.findMany({
      where: { id: { gte: skip } },
      take: take,
    });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const validatedBody = commentSchemaCreate.parse(req.body);
    const { articleId, content } = validatedBody;
    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: 0, //temp value
      },
    });
    if (!comment) {
      throw CustomError(`The article "${articleId}" doesn't exist`, 400);
    }
    return NextResponse.json({ comment }, { status: 201 });
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
    const validatedBody = commentSchemaUpdate.parse(req.body);
    const { id, content } = validatedBody;
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    if (!comment) {
      throw CustomError(`The article "${id}" doesn't exist`, 400);
    }
    return NextResponse.json({ comment }, { status: 201 });
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
