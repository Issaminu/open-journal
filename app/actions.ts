"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
export const handleSendComment = async (formData: FormData) => {
  console.log("We are in the handleSendComment function");
  console.log("formData", formData);

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
};
