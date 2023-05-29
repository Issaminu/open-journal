"use client";
import { ArticleType } from "@/app/read/[articleId]/page";
import Comments from "@/components/my-components/Comments";
import { getPrettyDateWithFullYear } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const getRandomTailwindTextColor = () => {
  const colors = [
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const FullArticle = ({ article }: { article: ArticleType }) => {
  const [categoryColor, setCategoryColor] = useState<string>();
  useEffect(() => {
    // The following useEffect handles getting the category color from localStorage if it exists,
    // Otherwise, it generates the color and then saves it in localStorage for future use.
    // This negates the need to save the category color for each category in the database.
    // And also negates the generation of the color upon reload,
    // Meaning that the category color doesn't change on each reload.
    const localStorageColor = localStorage.getItem(
      `article-${article.id.toString()}-categoryColor`
    );
    if (localStorageColor) {
      setCategoryColor(localStorageColor);
    } else {
      const color = getRandomTailwindTextColor();
      localStorage.setItem(
        `article-${article.id.toString()}-categoryColor`,
        color
      );
      setCategoryColor(color);
    }
  }, [article.id, categoryColor]);

  return (
    <div className="full-article my-10 flex items-center justify-center">
      <div className="mx-auto min-h-full bg-opacity-0 px-6 py-8 text-center lg:max-w-[80rem]">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-8 mb-12 mt-2 flex w-fit flex-col items-center justify-center gap-2 truncate text-[#92687e]">
            <span
              className={`w-fit text-sm font-semibold uppercase ${categoryColor}`}
            >
              {article.category.name}
            </span>
            <div
              className="mb-3 max-w-[80rem] break-all"
              style={{ wordWrap: "break-word" }}
            >
              <h1 className="break-all text-center text-5xl font-bold text-[#f1e5e5]">
                {article.title}
              </h1>
            </div>
            <div className="flex flex-row justify-center">
              <span className="truncate font-bold">{article.author.name}</span>
              <span className="mx-2 ">·</span>
              <span className="">
                {getPrettyDateWithFullYear(article.createdAt)}
              </span>
              {/* {article.updatedAt.toISOString() !=
                article.createdAt.toISOString() && (
                <div>
                  <span className="mx-2 ">·</span>
                  <span className="">
                    Last edited on{" "}
                    {getPrettyDateWithFullYear(article.updatedAt)}
                  </span>
                </div>
              )} */}
              <span className="mx-2">·</span>
              <span className="">
                {Math.ceil(article.content.length / 200)} min read
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center lg:mx-0">
          <Image
            src={article.image}
            width={1024}
            height={600}
            alt={article.title}
            loading="eager"
            priority={true}
            className="rounded-lg shadow"
            style={{
              transform: "translate3d(0, 0, 0)", // This supposedly makes rendering the image handled by the GPU, for better performance
            }}
          />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center px-4">
          <article className="line-height-4 prose prose-neutral whitespace-normal text-justify  text-lg text-[#F0D4DA] lg:prose-xl prose-h1:text-[#cfc5c2] ">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
          <Comments comments={article.comments} article={article} />
        </div>
      </div>
    </div>
  );
};

export default FullArticle;
