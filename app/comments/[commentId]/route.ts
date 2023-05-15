import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { commentId: string } }
) {
  try {
    const commentId = context.params.commentId;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });
    if (!comment)
      return NextResponse.json(
        { message: `Comment ${commentId} does not exist` },
        { status: 404 }
      );
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { commentId: string } }
) {
  try {
    const commentId = context.params.commentId;
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });
    if (!deletedComment) {
      return NextResponse.json(
        { message: `Comment ${commentId} does not exist` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
