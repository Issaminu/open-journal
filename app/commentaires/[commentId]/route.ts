import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, params: { commentId: number }) {
  const categoryId = params.commentId;
  const comment = await prisma.comment
    .findUnique({
      where: { id: categoryId },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: "Comment does not exist" },
        { status: 404 }
      );
    });
  return NextResponse.json(comment, { status: 200 });
}

export async function DELETE(_req: NextRequest, params: { commentId: number }) {
  const commentId = params.commentId;
  await prisma.comment
    .delete({
      where: { id: commentId },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: `Comment ${commentId} does not exist` },
        { status: 404 }
      );
    });
  return NextResponse.json(
    { message: "Comment deleted successfully" },
    { status: 200 }
  );
}
