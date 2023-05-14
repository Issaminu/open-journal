import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { commentId: string } }
) {
  const categoryId = context.params.commentId;
  const comment = await prisma.comment
    .findUniqueOrThrow({
      where: { id: parseInt(categoryId) },
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

export async function DELETE(
  _req: NextRequest,
  context: { params: { commentId: string } }
) {
  const commentId = context.params.commentId;
  await prisma.comment
    .delete({
      where: { id: parseInt(commentId) },
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
