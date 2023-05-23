import { ArticleType } from "./page";
const Article = ({ article }: { article: ArticleType }) => {
  console.log(article);
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default Article;
