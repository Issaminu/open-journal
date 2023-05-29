import { Comment as CommentType } from "@/lib/zod";
import Image from "next/image";

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <li className="px-6 min-h-full items-center rounded-xl max-w-[64rem] border-none bg-[#3c3a3a] bg-opacity-40 py-8 shadow-lg drop-shadow-lg backdrop-blur-lg duration-300 ease-in-out">
      <div className="flex justify-start flex-row w-fit items-start space-x-10">
        <div className="flex jusity-center h-full items-center">
          <Image
            src={`https://i.pravatar.cc/100?${comment.id}`}
            alt={comment.author.name}
            width={80}
            height={80}
            className="rounded-full outline outline-white/40 my-auto"
          />
        </div>
        <div className="flex flex-col justify-start w-[20rem] md:w-[34rem] lg:w-[44rem] items-start text-white">
          <span className="font-semibold text-xl">{comment.author.name}</span>
          <span className="text-sm mt-3 text-start">{comment.content}</span>
        </div>
      </div>
    </li>
  );
};

export default Comment;
