import { Card } from "@/components/ui/card";
import { Article, User } from "../../lib/zod";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
const PostCard = memo(function PostCard({
  user,
  article,
}: {
  user: User;
  article: Article;
}) {
  return (
    <>
      <div className="mx-4 my-4 h-full">
        <Card className="delay-50 group min-h-full items-center rounded-xl border-none bg-[#3c3a3a] bg-opacity-40 py-8 drop-shadow-lg backdrop-blur-lg  transition ease-in-out hover:cursor-pointer hover:bg-[#2a262c] xl:w-[32rem]">
          <Link href={`/read/${article.id}`} className="h-full">
            <div className="flex h-full flex-col justify-between space-y-7">
              <div className="px-4">
                <div>
                  <h1 className="font-articleTitle text-3xl text-[#ecd7d7]">
                    {article.title}
                  </h1>
                  <div className="mb-4 mt-2 flex w-full flex-row justify-between truncate">
                    <div>
                      <span className="mr-2 text-[#a48595]">By</span>
                      <span className="truncate font-bold text-[#a48595]">
                        {article.author.name}
                      </span>
                    </div>
                    <span className="mx-2 text-[#a48595]">|</span>
                    <span className="text-[#a48595]">
                      {article.createdAt.toLocaleDateString()}
                    </span>
                    <span className="mx-2 text-[#a48595]">|</span>
                    <span className="text-[#a48595]">
                      {Math.ceil(article.content.length / 200)} minute read
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="px-4">
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
                <div className="px-4">
                  <p
                    className={`line-height-4 line-clamp-4 font-tiempo text-lg text-[#9e9896]`}
                  >
                    {article.content}
                  </p>
                </div>
              </div>
              <div className="flex px-4 ">
                <p className="delay-50 font-bold text-[#e3cdc7] transition ease-in-out group-hover:translate-x-1 group-hover:text-[#e8b0a1]">
                  Continue reading{" "}
                  <span className="font-bold transition ease-in-out">→</span>
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
