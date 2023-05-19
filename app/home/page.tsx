import Home from "@/app/home/Home";
import prisma from "prisma/prisma";
import { Article } from "@/lib/zod";

const getArticles = async (numberOfArticles: number): Promise<Article[]> => {
  return (await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      image: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: numberOfArticles,
  })) as Article[];
};

const homePage = async () => {
  const articles = await getArticles(50);
  return <Home articles={articles} />;
};

export default homePage;
