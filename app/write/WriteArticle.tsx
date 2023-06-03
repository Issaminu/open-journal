"use client";
import { createArticle } from "@/app/actions";
import RichTextEditorContainer from "@/components/my-components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const WriteArticle = () => {
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
        className="flex h-full w-full flex-col justify-center sm:px-6 lg:px-8"
        style={{
          background: "url('/background.png') no-repeat center center fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="my-10 flex mx-auto items-center justify-center w-[70rem]">
          <div className="min-h-full bg-opacity-0 px-6 py-8 text-center min-w-full">
            <h1 className="text-4xl font-bold text-white">Write an article</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex flex-row w-full justify-between">
                <div className="w-[75%] text-left">
                  <Label htmlFor="title" className="text-rose-200 ml-1">
                    Title
                  </Label>
                  <Input
                    ref={titleRef}
                    type="text"
                    name="title"
                    onKeyDown={handleKeyDown}
                    className="bg-black/20 border-black/20 border-4 text-[#f1ebeb] outline-black"
                  />
                </div>
                <div className="w-[20%] flex-col text-left">
                  <Label htmlFor="categorie" className="text-rose-200 ml-1">
                    Categorie
                  </Label>
                  <Input
                    ref={categoryRef}
                    type="text"
                    name="categorie"
                    onKeyDown={handleKeyDown}
                    className="bg-black/20 border-black/20 border-4 text-[#f1ebeb] outline-black"
                  />
                </div>
              </div>
              <div className="mx-auto mt-10 max-w-[60rem] xl:min-w-[60rem]">
                <RichTextEditorContainer editorRef={editorRef} />
              </div>
            </div>

            <div className="flex flex-row justify-center gap-6 items-center w-full mt-16">
              <Button
                onClick={saveArticle}
                className="bg-cyan-600 w-44 font-semibold hover:bg-cyan-700 active:bg-cyan-800 px-4 py-2 rounded-lg text-white ml-4"
              >
                Publish
              </Button>{" "}
              <Button asChild variant={"outline"} className="text-white">
                <Link href="/home">Cancel</Link>
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteArticle;
