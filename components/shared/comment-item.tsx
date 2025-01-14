"use client";
import { sliceText } from "@/lib/utils";
import { IPost } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { Heart } from "lucide-react";
import { User as IUser } from "next-auth";
import { AiFillDelete } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentItem = ({ comment, user }: { comment: IPost; user: IUser }) => {
  const onLike = async () => {};
  const onDelete = async () => {};
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={comment?.user?.profileImage} />
          <AvatarFallback>{comment?.user?.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {comment?.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {comment && comment?.user.username
                ? `@${sliceText(comment.user.username, 20)}`
                : comment && sliceText(comment.user.email, 20)}
            </span>
            <span className="text-neutral-500 text-sm">
              {comment &&
                comment.createdAt &&
                formatDistanceToNowStrict(new Date(comment.createdAt))}
            </span>
          </div>
          <div className="text-white mt-1">{comment?.body}</div>

          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
              onClick={onLike}
            >
              <Heart
                size={20}
                {...(comment?.hasLiked && { className: "text-red-500" })}
              />
              <p>{comment.likes || 0}</p>
            </div>

            {comment?.user?._id === user?._id && (
              <div
                className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
                onClick={onDelete}
              >
                <AiFillDelete size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
