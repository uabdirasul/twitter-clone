import { sliceText } from "@/lib/utils";
import { IPost, User as IUser } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { Heart } from "lucide-react";
import { AiFillDelete, AiOutlineMessage } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const PostItem = ({ post, user }: { post: IPost; user: IUser }) => {
  console.log(post.user.name[0]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
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
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
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
