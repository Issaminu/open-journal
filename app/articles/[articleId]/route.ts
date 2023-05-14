import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { articleId: string } }
) {
  const articleId = context.params.articleId;
  const article = await prisma.article
    .findUnique({
      where: { id: parseInt(articleId) },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: `Article ${articleId} does not exist` },
        { status: 404 }
      );
    });
  return NextResponse.json(article, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { articleId: string } }
) {
  const articleId = context.params.articleId;
  await prisma.article
    .delete({
      where: { id: parseInt(articleId) },
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: `Article ${articleId} does not exist` },
        { status: 404 }
      );
    });
  return NextResponse.json(
    { message: "Article deleted successfully" },
    { status: 200 }
  );
}
