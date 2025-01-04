"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback } from "react";
import { AiFillGithub as GithubIcon } from "react-icons/ai";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import LoginModal from "../modals/login-modal";
import RegisterModal from "../modals/register-modal";
import Button from "../ui/button";

export default function Auth() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data } = useSession();
  console.log(data);

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div className="container h-screen mx-auto max-w-7xl px-4">
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          alt="X logo"
          width={450}
          height={450}
          className="justify-self-center hidden md:block"
        />

        <div className="flex flex-col justify-center md:justify-between gap-6 h-full md:h-[70vh]">
          <div className="block md:hidden">
            <Image src={"/images/x.svg"} alt="X logo" width={50} height={50} />
          </div>
          <h1 className="text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className="flex gap-2  items-center justify-center">
                    <GoogleIcon />
                    Sign Up With Google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                onClick={() => signIn("github")}
                label={
                  <div className="flex gap-2  items-center justify-center">
                    <GithubIcon />
                    Sign Up With Github
                  </div>
                }
                fullWidth
                secondary
              />
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2" />
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2" />
              </div>
              <Button
                label="Create Account"
                fullWidth
                onClick={onOpenRegisterModal}
              ></Button>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h3 className="font-medium text-xl mb-4">
              Already have an account?
            </h3>
            <Button
              label={"Sign in"}
              fullWidth
              outline
              onClick={onOpenLoginModal}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
