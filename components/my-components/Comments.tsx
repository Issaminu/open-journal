"use client";
import { ArticleType } from "@/app/read/[articleId]/page";
import Comment from "@/components/my-components/Comment";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleSendComment } from "@/app/actions";
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
    <div className="mt-24">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold text-[#f1e5e5] text-left">
          Comments ({comments.length})
        </h1>
        <Button
          variant={"secondary"}
          className="bg-[#e24646] hover:bg-[#EE5C5C] active:bg-[#ee6868] text-white"
          onClick={() => setIsAddComment(true)}
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
              action={handleSendComment}
              className="w-full flex flex-col justify-start items-start"
            >
              <Label
                className="text-lg font-semibold text-[#f1e5e5]"
                htmlFor="send-comment"
              >
                Write a comment
              </Label>
              <div className="w-full flex flex-col justify-center items-center">
                <Textarea
                  name="content"
                  id="send-comment"
                  placeholder="Type your message here..."
                  className=" rounded-lg outline-none bg-[#3c3a3a] bg-opacity-40 text-white p-4"
                />
                <input type="hidden" name="articleId" value={article.id} />
                <input type="hidden" name="userId" value={session.user.id} />
                <Button
                  variant={"secondary"}
                  type="submit"
                  className="mt-4 w-full"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ul className="flex flex-col space-y-4 mt-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
