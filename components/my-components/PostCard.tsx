import { Card } from "@/components/ui/card";
import { Article } from "../../lib/zod";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { getPrettyDateWithFullYear } from "@/lib/utils";
const PostCard = memo(function PostCard({ article }: { article: Article }) {
  return (
    <>
      <div className="mx-4 my-4 box-border h-full">
        <Card className="group min-h-full items-center rounded-xl border-none bg-[#3c3a3a] bg-opacity-40 py-8 shadow-lg  drop-shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:rounded-3xl hover:bg-[#2a262c] hover:shadow-2xl xl:w-[32rem]">
          <Link href={`/read/${article.id}`} className="h-full">
            <div className="flex h-full flex-col justify-between space-y-7">
              <div className="px-6">
                <div>
                  <h1 className="font-articleTitle text-3xl text-[#ecd7d7] transition-colors duration-500 ease-in-out group-hover:text-white">
                    {article.title}
                  </h1>
                  <div className="mb-4 mt-2 flex w-full flex-row justify-between truncate text-[#a48595] transition-colors duration-500 ease-in-out group-hover:text-[#92687e]">
                    <div>
                      <span className="mr-2">By</span>
                      <span className="truncate font-bold">
                        {article.author.name}
                      </span>
                    </div>
                    <span className="mx-2 ">·</span>
                    <span className="">
                      {getPrettyDateWithFullYear(article.createdAt)}
                    </span>
                    <span className="mx-2 ">·</span>
                    <span className="">
                      {Math.ceil(article.content.length / 200)} minute read
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="px-6">
                  <Image
                    src={article.image}
                    width={60000}
                    height={100}
                    alt={article.title}
                    loading="lazy"
                    className="rounded-xl"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                  />
                </div>
                <div className="px-6">
                  <p
                    className={`line-height-4 line-clamp-4 whitespace-normal text-justify font-tiempo text-lg text-[#9e9896] transition duration-200 ease-in-out group-hover:text-white`}
                  >
                    {article.content}
                  </p>
                </div>
              </div>
              <div className="flex px-6">
                <p className="font-bold text-[#e3cdc7] transition ease-in-out hover:underline group-hover:translate-x-1 group-hover:text-[#e8b0a1]">
                  Continue reading →
                </p>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </>
  );
});

export default PostCard;
