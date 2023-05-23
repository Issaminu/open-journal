import { ArticleType } from "@/app/read/[articleId]/page";
import { Card } from "@/components/ui/card";
import { getPrettyDateWithFullYear } from "@/lib/utils";
import Image from "next/image";

const FullArticle = ({ article }: { article: ArticleType }) => {
  return (
    <div className="full-article my-10 flex items-center justify-center">
      <div className="mx-auto min-h-full max-w-[60rem] bg-opacity-0 px-6 py-8 text-center">
        <div className="flex flex-col">
          <div className="mx-8 mb-12 mt-2 flex w-full flex-col justify-center truncate text-[#92687e]">
            <h1 className="text-left font-articleTitle text-4xl text-[#f1e5e5]">
              {article.title}
            </h1>
            <div className="flex flex-row">
              <span className="mr-2">By</span>
              <span className="truncate font-bold">{article.author.name}</span>
              <span className="mx-2 ">·</span>
              <span className="">
                Released on {getPrettyDateWithFullYear(article.createdAt)}
              </span>
              {article.updatedAt.toISOString() !=
                article.createdAt.toISOString() && (
                <div>
                  <span className="mx-2 ">·</span>
                  <span className="">
                    Last edited on{" "}
                    {getPrettyDateWithFullYear(article.updatedAt)}
                  </span>
                </div>
              )}
              <span className="mx-2">·</span>
              <span className="">
                {Math.ceil(article.content.length / 200)} minute read
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center lg:mx-0">
          <Image
            src={article.image}
            width={700}
            height={300}
            alt={article.title}
            loading="eager"
            className="rounded-lg shadow"
            style={{
              transform: "translate3d(0, 0, 0)", // This supposedly makes rendering the image handled by the GPU, for better performance
            }}
          />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center px-4">
          <article className="line-height-4 prose prose-neutral whitespace-normal text-justify font-hubot text-lg text-[#F0D4DA] lg:prose-xl prose-h1:text-[#cfc5c2] ">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default FullArticle;
