"use client";

import { toast } from "@/hooks/use-toast";
import { sliceText } from "@/lib/utils";
import { IPost, User as IUser } from "@/types";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { Heart, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { AiFillDelete, AiOutlineMessage } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  post: IPost;
  user: IUser;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostItem = ({ post, user, setPosts }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/posts`, {
        data: {
          postId: post._id
        }
      });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    }
  };
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={post.user.profileImage} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {post?.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {post?.user?.username
                ? sliceText(post?.user?.username, 16)
                : sliceText(post?.user?.email, 16)}
            </span>
            <span className="text-neutral-500 text-sm">
              {formatDistanceToNowStrict(new Date(post.createdAt))} ago
            </span>
          </div>
          <div className="text-white mt-1">{post?.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post?.comments?.length || 0}</p>
            </div>

            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <Heart size={20} />
              <p>{post?.likes?.length || 0}</p>
            </div>

            {post?.user?._id === user?._id && (
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

export default PostItem;
