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
      <div
        className="grid-container grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))" }}
      >
        {articles.map((article) => (
          <PostCard key={article.id} user={session.user} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
