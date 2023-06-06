"use client";
import { createArticle } from "@/app/actions";
import RichTextEditorContainer from "@/components/my-components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const Write = () => {
  const editorRef = React.useRef("");
  const titleRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLInputElement>(null);
  let [_isPending, startTransition] = useTransition();
  const router = useRouter();
  const saveArticle = async () => {
    if (
      !titleRef.current?.value ||
      !categoryRef.current?.value ||
      !editorRef.current
    ) {
      return;
    }
    const content = editorRef.current;
    const title = titleRef.current.value;
    const categoryName = categoryRef.current.value;
    startTransition(
      async () => await createArticle(title, content, categoryName)
    );
    router.push("/read/latest");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // This function prevents the user from being able to make a new line in the title or category.
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <>
      <div
        className="flex h-screen items-center justify-center sm:px-6 lg:px-8"
        style={{
          background: "url('/gradient.png') no-repeat center center fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="my-10 bg-[#3c3a3a] flex flex-col px-12 py-6 bg-opacity-40 shadow-lg rounded-xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          <h1 className="text-4xl text-center font-bold text-[#ecd7d7] mb-6">
            Write an article
          </h1>
          <div className="flex flex-row justify-between gap-6">
            <div className=" w-[75%]">
              <Label htmlFor="title" className="text-rose-200 ml-1">
                Title
              </Label>
              <Input
                ref={titleRef}
                type="text"
                name="title"
                onKeyDown={handleKeyDown}
                className="bg-black/20 border-black/20 border-4 text-[#f1ebeb] outline-black w-full"
              />
            </div>
            <div className=" w-[20%]">
              <Label htmlFor="category" className="text-rose-200 ml-1">
                Category
              </Label>
              <Input
                ref={categoryRef}
                type="text"
                name="category"
                onKeyDown={handleKeyDown}
                className="bg-black/20 border-black/20 border-4 text-[#f1ebeb] outline-black w-full"
              />
            </div>
          </div>
          <div className="mt-10">
            <RichTextEditorContainer editorRef={editorRef} />
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <Button
              onClick={saveArticle}
              className="bg-[#934f5c] w-44 hover:bg-[#7c3744] active:bg-[#612631] text-[#ebc6c6] px-4 py-2 rounded-lg"
            >
              Publish
            </Button>
            <Link href="/home">
              <Button className="bg-transparent text-[#cc9b9c] hover:bg-black/30 active:bg-black/40">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
