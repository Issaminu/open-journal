import prisma from "@/prisma/prisma";
import { getServerSession } from "@/lib/getServerSession";
import { NextRequest, NextResponse } from "next/server";

const getLatestArticles = async (userId: number) => {
  const latestArticleId = await prisma.article.findMany({
    where: {
      authorId: userId,
      isPublished: true,
    },
    select: { id: true },
    orderBy: { id: "desc" },
    take: 1,
  });
  return latestArticleId[0].id;
};

// This Route Handler only exists to redirect the user to the latest article they wrote.
// The reason for its existence is that we can't predict the latest article's ID in the client.
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.redirect(new URL("/home", req.url));
  const latestArticleId = await getLatestArticles(session.user.id);
  if (!latestArticleId) return NextResponse.redirect(new URL("/home", req.url));
  return NextResponse.redirect(
    new URL("/read" + latestArticleId.toString(), req.url)
  );
}

export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/home", req.url));
}
