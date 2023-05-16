import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, isCustomError } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const commentId = context.params.slug;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });
    if (!comment) {
      throw CustomError(`Comment ${commentId} does not exist`, 404);
    }
    return NextResponse.json(comment, { status: 200 });
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
    const commentId = context.params.slug;
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });
    if (!deletedComment) {
      throw CustomError(`Comment ${commentId} does not exist`, 404);
    }
    return NextResponse.json(
      { message: "Comment deleted successfully" },
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
