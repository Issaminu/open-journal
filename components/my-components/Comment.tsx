import { Comment as CommentType } from "@/lib/zod";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UilEdit } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useRef, useState, useTransition } from "react";
import { deleteComment, editComment } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Comment = ({
  comment,
  articleId,
}: {
  comment: CommentType;
  articleId: number;
}) => {
  const { data: session } = useSession();
  const [_isPending, startTransition] = useTransition();
  let [isEditComment, setIsEditComment] = useState<boolean>(false);
  const editCommentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (comment.content && editCommentRef.current) {
      editCommentRef.current.value = comment.content;
    }
  });
  return (
    <li className="px-6 min-h-full items-center rounded-xl w-full border-none bg-[#3c3a3a] bg-opacity-40 py-8 shadow-lg drop-shadow-lg backdrop-blur-lg duration-300 ease-in-out">
      <div className="flex justify-start flex-row w-full items-start space-x-10">
        <div className="flex jusity-center h-full items-center">
          <Image
            src={`https://i.pravatar.cc/100?${comment.id}`}
            alt={comment.author.name}
            width={80}
            height={80}
            className="rounded-full outline outline-white/40 my-auto"
          />
        </div>
        <div className="flex flex-col justify-start w-full items-start text-white">
          <div className="flex flex-row justify-between items-between w-full">
            <span className="font-semibold text-xl text-center flex items-center">
              {comment.author.name}
              {session && session.user.id === comment.author.id && (
                <Badge
                  variant="outline"
                  className="text-white ml-3 text-xs text-center h-5"
                >
                  You
                </Badge>
              )}
            </span>
            {session && session.user.id === comment.author.id && (
              <>
                <div className="flex flex-row gap-4">
                  {!isEditComment && (
                    <button
                      onClick={() => {
                        setIsEditComment(true);
                      }}
                      className="hover:bg-gray-800/40 p-1 rounded-md active:bg-gray-800/80"
                    >
                      <UilEdit className="text-green-400" />
                    </button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="hover:bg-gray-800/40 p-1 rounded-md active:bg-gray-800/80">
                        <UilTrashAlt className="text-red-400" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-xl border-none bg-[#3c3a3a] bg-opacity-40 py-8 shadow-lg drop-shadow-lg backdrop-blur-lg duration-300 ease-in-out">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#fcebef] text-xl font-extrabold">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#f1e5e5]">
                          This action cannot be undone. This will permanently
                          delete your comment.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          onClick={() => {
                            startTransition(() => {
                              deleteComment(comment.id, articleId);
                            });
                          }}
                          className="bg-red-600 hover:bg-red-700 mb-6 font-bold active:bg-red-800"
                        >
                          Continue
                        </AlertDialogAction>
                        <AlertDialogCancel className="text-white font-bold">
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </div>
          {!isEditComment && (
            <span className=" text-white whitespace-normal text-start">
              {comment.content}
            </span>
          )}
          {isEditComment && (
            <div className="flex flex-col justify-start items-start w-full">
              <textarea
                className="w-full h-32 p-2 rounded-lg bg-[#3c3a3a] bg-opacity-40 text-white outline-none"
                defaultValue={comment.content}
                ref={editCommentRef}
                autoFocus
                required
                onFocus={(e) => e.currentTarget.select()}
              ></textarea>
              <div className="flex flex-row justify-end items-center w-full mt-6 gap-4">
                <Button
                  onClick={() => {
                    startTransition(
                      async () =>
                        await editComment(
                          comment.id,
                          articleId,
                          editCommentRef.current?.value
                        )
                    );
                    setIsEditComment(false);
                  }}
                  variant={"secondary"}
                  className="bg-[#934f5c] w-44  hover:bg-[#7c3744] active:bg-[#612631] text-[#ebc6c6] px-4 py-2 rounded-lg"
                >
                  Save
                </Button>
                <Button
                  className="bg-transparent w-24 text-[#cc9b9c]  hover:bg-black/30  active:bg-black/40 "
                  onClick={() => setIsEditComment(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
