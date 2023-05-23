import { Card } from "@/components/ui/card";
import { ArticleType } from "./page";
import FullArticle from "@/components/my-components/FullArticle";
const Article = ({ article }: { article: ArticleType }) => {
  return (
    <div
      className="h-full w-full overflow-x-hidden px-6 lg:px-8"
      style={{
        background: "url('/background.png') no-repeat center center fixed",
        backgroundSize: "cover",
        minHeight: "100rem",
      }}
    >
      <FullArticle article={article} />
    </div>
  );
};

export default Article;
