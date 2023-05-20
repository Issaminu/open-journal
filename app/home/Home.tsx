"use client";

import PostCard from "@/components/my-components/PostCard";
import { Article } from "@/lib/zod";
import { useSession } from "next-auth/react";

const Home = ({ articles }: { articles: Article[] }) => {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div
      className="h-full w-full overflow-x-hidden px-6 lg:px-8"
      style={{
        background: "url('/background.png') no-repeat center center fixed",
        backgroundSize: "cover",
        minHeight: "100rem",
      }}
    >
      <div className="my-6">
        <div className="mx-auto mb-16 mt-12 flex w-fit flex-col justify-center">
          <h1 className="font-articleTitle text-6xl text-[#ecd7d7]">
            {session.user.name}&apos;s blog
          </h1>
          {/* <hr className="my-8 h-px border-0 bg-[#ecd7d7]" /> */}
        </div>
        <div className="flex flex-wrap justify-center">
          {articles.map((article) => (
            <PostCard key={article.id} user={session.user} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
