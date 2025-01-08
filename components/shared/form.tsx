"use client";

import { toast } from "@/hooks/use-toast";
import { IPost, User as IUser } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Button from "../ui/button";

interface Props {
  placeholder: string;
  user: IUser;
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}

const Form = ({ placeholder, user, setPosts }: Props) => {
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/posts", {
        body,
        userId: user?._id
      });

      const newPost = { ...data, user };
      setPosts((prev) => [newPost, ...prev]);

      toast({
        title: "Success",
        description: "Your post has been published."
      });
      setIsLoading(false);
      setBody("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <textarea
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
            placeholder={placeholder}
            disabled={isLoading}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

          <div className="mt-4 flex flex-row justify-end">
            <Button
              label={"Post"}
              classNames="px-8"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
