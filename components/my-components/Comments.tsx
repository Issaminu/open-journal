"use client";
import { ArticleType } from "@/app/read/[articleId]/page";
import Comment from "@/components/my-components/Comment";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/app/actions";
import type { Comment as CommentType } from "@/lib/zod";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Comments = ({
  comments,
  article,
}: {
  comments: CommentType[];
  article: ArticleType;
}) => {
  const [isAddComment, setIsAddComment] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleSendToSignIn = () => {
    setIsAddComment(false);
    router.push(`/login?callbackUrl=${pathName}`);
  };

  return (
    <div className="mt-24 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold text-[#f1e5e5] text-left">
          Comments ({comments.length})
        </h1>
        <Button
          variant={"secondary"}
          className="bg-[#e24646] hover:bg-[#EE5C5C] active:bg-[#ee6868] text-white"
          onClick={() => setIsAddComment(!isAddComment)}
        >
          + Add Comment
        </Button>
      </div>
      {isAddComment && !session && (
        <div className="flex flex-col items-center justify-center mt-4">
          <span className="text-xl font-semibold text-white">
            Please sign in to add a comment.
          </span>
          <Button
            variant={"secondary"}
            onClick={handleSendToSignIn}
            className="mt-4"
          >
            Sign In
          </Button>
        </div>
      )}
      {isAddComment && session && (
        <div className="flex flex-col items-start justify-start mt-4">
          <div className="w-full flex flex-col justify-start items-start">
            <form
              action={(formData) => {
                createComment(formData);
                setIsAddComment(false);
              }}
              className="w-full flex flex-col justify-start items-start"
            >
              <Label
                className="text-lg font-semibold text-[#f1e5e5]"
                htmlFor="send-comment"
              >
                Write a comment
              </Label>
              <div className="w-full flex flex-col justify-center items-end">
                <Textarea
                  name="content"
                  id="send-comment"
                  autoFocus
                  required
                  placeholder="Type your message here..."
                  className=" rounded-lg min-h-[10rem] outline-none bg-[#3c3a3a] bg-opacity-40 text-white p-4"
                />
                <input
                  required
                  type="hidden"
                  name="articleId"
                  value={article.id}
                />
                <input
                  required
                  type="hidden"
                  name="userId"
                  value={session.user.id}
                />
                <div className="flex flex-row mt-4 gap-4">
                  <Button
                    variant={"secondary"}
                    type="submit"
                    className="bg-cyan-600 w-44 font-semibold hover:bg-cyan-700 active:bg-cyan-800 px-4 py-2 rounded-lg text-white"
                  >
                    Send
                  </Button>
                  <Button
                    className="bg-gray-300 w-24 text-black hover:bg-gray-400 active:bg-gray-500"
                    onClick={() => setIsAddComment(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ul className="flex flex-col space-y-4 mt-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} articleId={article.id} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
