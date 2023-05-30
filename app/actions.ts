"use server";
import { getServerSession } from "@/lib/getServerSession";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (formData: FormData) => {
  try {
    const comment = formData.get("content") as unknown as string | null;
    const articleId = formData.get("articleId") as unknown as string | null;
    const userId = formData.get("userId") as unknown as string | null;
    if (!comment || !articleId || !userId) return;
    console.log("comment", comment, "articleId", articleId, "userId", userId);
    await prisma.comment.create({
      data: {
        articleId: parseInt(articleId),
        content: comment,
        authorId: parseInt(userId),
      },
    });
    revalidatePath(`/read/${articleId}`);
    return true;
  } catch (e) {
    console.error(e);
  }
};

export const deleteComment = async (commentId: number, articleId: number) => {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(`/read/${articleId}`);
  } catch (e) {
    console.error(e);
  }
};

export const editComment = async (
  commentId: number,
  articleId: number,
  content?: string
) => {
  const session = await getServerSession();
  console.log(session);

  if (!session || !content) return;
  try {
    // Using `UpdateMany` instead of `update` because Prisma sucks. @see: https://github.com/prisma/prisma/discussions/4185
    await prisma.comment.updateMany({
      where: {
        authorId: session.user.id,
        id: commentId,
      },
      data: {
        content: content,
      },
    });
    revalidatePath(`/read/${articleId}`);
  } catch (e) {
    console.error(e);
  }
};
