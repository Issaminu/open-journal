"use client";

import Header from "@/components/my-components/Header";
import PostCard from "@/components/my-components/PostCard";
import { Article } from "@/lib/zod";
import { useSession } from "next-auth/react";
import type { getMetaDataType } from "./page";
const Home = ({
  articles,
  metaData,
}: {
  articles: Article[];
  metaData: getMetaDataType;
}) => {
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
          <Header metaData={metaData} />
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
