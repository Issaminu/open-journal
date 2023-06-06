"use client";
import { ArticleType } from "@/app/read/[articleId]/page";
import Comments from "@/components/my-components/Comments";
import RichTextEditorContainer from "@/components/my-components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { getPrettyDateWithFullYear } from "@/lib/utils";
import Image from "next/image";
import { useTransition, useEffect, useRef, useState } from "react";
import { editArticle } from "@/app/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const getRandomTailwindTextColor = () => {
  const colors = [
    "text-red-400",
    "text-yellow-400",
    "text-green-400",
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const FullArticle = ({ article }: { article: ArticleType }) => {
  const { data: session } = useSession();
  const [categoryColor, setCategoryColor] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  let [_isPending, startTransition] = useTransition();
  const titleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef(article.content);
  const categoryRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // This function prevents the user from being able to make a new line in the title.
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const saveEdit = async () => {
    setIsEdit(false);
    if (
      !titleRef.current?.innerText ||
      !categoryRef.current?.value ||
      !article.content
    ) {
      return;
    }
    article.content = editorRef.current;
    article.title = titleRef.current.innerText;
    article.category.name = categoryRef.current.value;
    startTransition(
      async () =>
        await editArticle(
          article.id,
          article.title,
          article.content,
          article.category.name
        )
    );
  };
  useEffect(() => {
    // This effect handles getting the category color from localStorage if it exists,
    // Otherwise, it generates the color and then saves it in localStorage for future use.
    // This negates the need to save the category color for each category in the database.
    // And also negates the generation of the color upon reload,
    // Meaning that the category color doesn't change on each reload.
    const localStorageColor = localStorage.getItem(
      `article-${article.id.toString()}-categoryColor`
    );
    if (localStorageColor) {
      setCategoryColor(localStorageColor);
    } else {
      const color = getRandomTailwindTextColor();
      localStorage.setItem(
        `article-${article.id.toString()}-categoryColor`,
        color
      );
      setCategoryColor(color);
    }
  }, [article.id, categoryColor]);
  return (
    <div className="my-10 flex mx-auto items-center justify-center">
      <div className="mx-auto min-h-full bg-opacity-0 px-6 py-8 text-center">
        {isEdit && article.author.id === session?.user.id ? (
          <form>
            <div className="flex flex-col items-center justify-center">
              <div className="mx-8 mb-12 mt-2 flex w-full flex-col items-center justify-center gap-2 truncate text-[#cc9b9c]">
                <div className="flex flex-row justify-center lg:justify-between w-full">
                  <Button
                    className="bg-[#934f5c] hover:bg-[#7c3744] active:bg-[#612631] text-[#ebc6c6]"
                    onClick={saveEdit}
                  >
                    Save Edit
                  </Button>
                  <input
                    type="text"
                    name="categoryName"
                    ref={categoryRef}
                    defaultValue={article.category.name}
                    required
                    autoFocus
                    className={`w-fit text-sm bg-transparent text-center decoration-green-300 outline-none font-semibold underline decoration-4 uppercase ${categoryColor}`}
                  />
                  <Button
                    className="bg-transparent w-24 text-[#cc9b9c]  hover:bg-black/30  active:bg-black/40 "
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="mb-3 max-w-[65rem] min-h-full ">
                  <div
                    onKeyDown={handleKeyDown}
                    ref={titleRef}
                    role="textbox"
                    contentEditable
                    suppressContentEditableWarning={true}
                    className=" decoration-green-300 bg-transparent underline decoration-4 outline-none flex-nowrap whitespace-normal text-center text-5xl font-bold text-[#f1e5e5]"
                  >
                    {article.title}
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <span className="truncate font-bold">
                    {article.author.name}
                  </span>
                  <span className="mx-2 ">·</span>
                  <span className="">
                    {getPrettyDateWithFullYear(article.createdAt)}
                  </span>
                  <span className="mx-2">·</span>
                  <span className="">
                    {Math.ceil(article.content.length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center justify-center lg:mx-0">
              <Image
                src={article.image}
                width={1024}
                height={600}
                alt={article.title}
                loading="eager"
                priority={true}
                className="rounded-2xl shadow px-1 lg:px-0"
                style={{
                  transform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
            <div className="mt-8 flex flex-col items-center justify-center px-4">
              <div className="mx-auto max-w-[60rem] xl:min-w-[60rem]">
                <RichTextEditorContainer
                  content={article.content}
                  editorRef={editorRef}
                />
              </div>
              <Comments comments={article.comments} article={article} />
            </div>
          </form>
        ) : (
          <motion.div layoutId={`${article.id}-card`}>
            <div className="flex flex-col items-center justify-center">
              <div className="mx-8 mb-12 mt-2 flex w-full flex-col items-center justify-center gap-2 truncate text-[#cc9b9c]">
                <div className="flex flex-row items-center w-full">
                  <div className="flex flex-row justify-start items-center w-full">
                    <Button
                      asChild
                      className="w-fit bg-transparent hover:bg-black/30 border-2 border-transparent hover:border-white/20"
                    >
                      <Link href="/home">
                        <UilArrowLeft className="text-[#AC8A89]" />
                      </Link>
                    </Button>
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                    }}
                    className={`w-fit  text-sm font-semibold uppercase ${categoryColor}`}
                  >
                    {article.category.name}
                  </motion.span>
                  <div className="flex flex-row justify-end items-center w-full">
                    {article.author.id === session?.user.id && (
                      <Button
                        className="text-[#ecd7d7] bg-[#5d353b] hover:bg-[#73434A] active:bg-[#7c4c53]"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit Article
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className="mb-3 max-w-[65rem] break-all"
                  style={{ wordWrap: "break-word" }}
                >
                  <motion.h1
                    layoutId={`${article.id}-title`}
                    transition={{
                      type: "spring",
                      damping: 20,
                    }}
                    className="break-all drop-shadow-2xl line-height-4 flex-nowrap whitespace-normal text-center text-5xl font-bold text-[#f1e5e5]"
                  >
                    {article.title}
                  </motion.h1>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                  }}
                  className="flex flex-row justify-center"
                >
                  <span className="truncate font-bold">
                    {article.author.name}
                  </span>
                  <span className="mx-2 ">·</span>
                  <span className="">
                    {getPrettyDateWithFullYear(article.createdAt)}
                  </span>
                  <span className="mx-2">·</span>
                  <span className="">
                    {Math.ceil(article.content.length / 200)} min read
                  </span>
                </motion.div>
              </div>
            </div>
            <motion.div
              layoutId={`${article.id}-image`}
              transition={{
                type: "spring",
                damping: 20,
              }}
              className="mx-auto flex flex-col items-center justify-center lg:mx-0"
            >
              <Image
                src={article.image}
                width={1024}
                height={600}
                alt={article.title}
                loading="eager"
                priority={true}
                className="rounded-2xl shadow px-1 lg:px-0"
                style={{
                  transform: "translate3d(0, 0, 0)",
                }}
              />
            </motion.div>
            <div className="mt-8 flex flex-col items-center justify-center px-4">
              <article className="line-height-4 prose prose-neutral whitespace-normal text-justify text-lg text-[#F0D4DA] lg:prose-xl prose-h1:text-[#ffffff] prose-h1:mb-4 prose-h2:mt-2 prose-h2:text-[#e1d5d2] prose-h3:text-[#ebe2e0] prose-h4:text-[#f0e6e2]">
                <motion.div
                  layoutId={`${article.id}-content`}
                  transition={{
                    type: "spring",
                    damping: 20,
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>
              <Comments comments={article.comments} article={article} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FullArticle;
