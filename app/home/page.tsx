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
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: numberOfArticles,
  })) as Article[];
};

const getMetaData = async () => {
  const articleCount = await prisma.article.count({});
  const userCount = await prisma.user.count({});
  let latestAddition = await prisma.article.findFirst({
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  return { articleCount, userCount, latestAddition: latestAddition };
};
export type getMetaDataType = Awaited<ReturnType<typeof getMetaData>>;

const homePage = async () => {
  const articles = await getArticles(50);
  const metaData: getMetaDataType = await getMetaData();
  return <Home articles={articles} metaData={metaData} />;
};

export default homePage;
