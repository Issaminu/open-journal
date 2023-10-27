import Article from "@/app/read/[articleId]/Article";
import prisma from "@/prisma/prisma";

export const revalidate = 1800;

async function getArticleById(articleId: number) {
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      image: true,
      content: true,
      createdAt: true,
      updatedAt: true,
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
      comments: {
        select: {
          id: true,
          content: true,
          authorId: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
        },
      },
    },
  });
  if (!article) return null;
  article.comments.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  return article;
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    select: {
      id: true,
    },
  });
  return articles.map((article) => ({
    articleId: article.id.toString(),
  }));
}

export type ArticleType = NonNullable<
  Awaited<ReturnType<typeof getArticleById>>
>;

const Page = async ({ params }: { params: { articleId: string } }) => {
  const article = await getArticleById(parseInt(params.articleId));
  if (!article) return <span>Error!</span>;
  return (
    <div>
      <Article article={article} />
    </div>
  );
};
export default Page;
