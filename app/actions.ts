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
    await prisma.comment.create({
      data: {
        articleId: parseInt(articleId),
        content: comment,
        authorId: parseInt(userId),
      },
    });
    revalidatePath(`/read/${articleId}`);
    revalidatePath("/home");
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
    revalidatePath("/home");
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
    revalidatePath("/home");
  } catch (e) {
    console.error(e);
  }
};

export const editArticle = async (
  articleId: number,
  title: string,
  content: string,
  categoryName: string
) => {
  const session = await getServerSession();
  if (!session || !content || !categoryName) return;

  try {
    const category = await prisma.category.upsert({
      where: {
        name: categoryName,
      },
      create: {
        name: categoryName,
        authorId: session.user.id,
      },
      update: {},
    });

    // Using `UpdateMany` instead of `update` because Prisma sucks. @see: https://github.com/prisma/prisma/discussions/4185
    await prisma.article.updateMany({
      where: {
        id: articleId,
        // authorId: session.user.id,
      },
      data: {
        title: title,
        content: content,
        categoryId: category.id,
      },
    });
    revalidatePath(`/read/${articleId}`);
    revalidatePath("/home");
  } catch (e) {
    console.error(e);
  }
};

export const deleteArticle = async (articleId: number) => {
  const session = await getServerSession();
  if (!session) return;

  try {
    await prisma.article.deleteMany({
      where: {
        id: articleId,
        authorId: session.user.id,
      },
    });
    revalidatePath("/home");
  } catch (e) {
    console.error(e);
  }
};

export const createArticle = async (
  title: string,
  content: string,
  categoryName: string
) => {
  const session = await getServerSession();
  if (!session || !content || !categoryName) return;
  try {
    const category = await prisma.category.upsert({
      where: {
        name: categoryName,
      },
      create: {
        name: categoryName,
        authorId: session.user.id,
      },
      update: {},
    });

    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        authorId: session.user.id,
        isPublished: true,
        categoryId: category.id,
        image: `https://picsum.photos/1024/600?fakeSearchParam=${Math.floor(
          Math.random() * 1000
        )}`, // TODO: Set up image upload
      },
    });

    revalidatePath("/home");
  } catch (e) {
    console.error(e);
  }
};
