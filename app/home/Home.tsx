"use client";

import Header from "@/components/my-components/Header";
import PostCard from "@/components/my-components/PostCard";
import { Article } from "@/lib/zod";
import { useSession } from "next-auth/react";
import type { getMetaDataType } from "./page";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";
const Home = ({
  articles,
  metaData,
}: {
  articles: Article[];
  metaData: getMetaDataType;
}) => {
  const { data: session } = useSession();
  const [postNum, setPostNum] = useState(3);
  const [infiniteArticles, setInfiniteArticles] = useState<Article[]>([
    ...articles,
  ]);
  const fetchData = useCallback(
    async (numberOfPosts: number) => {
      console.log("fetching more data ...");
      const res = (await axios
        .get(`/articles/?take=${numberOfPosts}&skip=${postNum}`)
        .then(
          (data) => {
            setPostNum(postNum + numberOfPosts);
            return data;
          },
          (error) => {
            console.error(error);
          }
        )) as AxiosResponse;
      let newArticles = res.data.articles as Article[]; // This is not exactly true, as article.createdAt fields are of type string, not Date.

      // When getting data from an API, Date objects automatically get stringified.
      // The following Array.map() turns them back into Date objects.
      newArticles.map((article) => {
        article.createdAt = new Date(article.createdAt);
      });
      setInfiniteArticles([...infiniteArticles, ...newArticles]);
    },
    [infiniteArticles, postNum]
  );
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
        <div>
          <InfiniteScroll
            dataLength={infiniteArticles.length}
            next={() => fetchData(20)}
            hasMore={true}
            className="flex flex-wrap justify-center"
            loader={<></>} //TODO: Create a component for a skeleton animation of PostCard
          >
            {infiniteArticles.map((article) => (
              <PostCard key={article.id} article={article} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
