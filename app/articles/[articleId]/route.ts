import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, isCustomError } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const articleId = context.params.slug;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(articleId) },
    });
    if (!article) throw CustomError(`Article ${articleId} does not exist`, 404);
    return NextResponse.json(article, { status: 200 });
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
    const articleId = context.params.slug;
    const deletedArticle = await prisma.article.delete({
      where: { id: parseInt(articleId) },
    });
    if (!deletedArticle) {
      throw CustomError(`Article ${articleId} does not exist`, 404);
    }
    return NextResponse.json(
      { message: "Article deleted successfully" },
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
