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
      <div className="">
        <Card className="delay-50 group min-h-fit items-center rounded-xl border-none bg-[#3c3a3a] bg-opacity-40 py-8 drop-shadow-lg backdrop-blur-lg  transition ease-in-out hover:cursor-pointer hover:bg-[#2a262c] sm:w-[32rem]">
          <Link href={`/read/${article.id}`}>
            <div className="space-y-7">
              <div className="px-4">
                <div>
                  <h1 className="font-articleTitle text-2xl text-[#ecd7d7]">
                    {article.title}
                  </h1>
                  <div className="w-30 mb-4 mt-2 flex flex-row justify-between truncate">
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
                    width={600}
                    height={300}
                    alt={article.title}
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
                <div className="px-4">
                  <p
                    className={`line-clamp-${
                      Math.floor(Math.random() * 3) + 4
                    } font-serif text-[#9e9896]`}
                  >
                    {article.content}
                  </p>
                </div>
              </div>
              <div className="px-16">
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
